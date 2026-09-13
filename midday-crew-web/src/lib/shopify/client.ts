import { 
  GET_PRODUCTS_QUERY, 
  GET_PRODUCT_BY_HANDLE_QUERY, 
  GET_COLLECTIONS_QUERY, 
  GET_COLLECTION_PRODUCTS_QUERY 
} from './queries';
import { 
  CREATE_CART_MUTATION, 
  ADD_TO_CART_MUTATION, 
  UPDATE_CART_LINES_MUTATION, 
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY
} from './mutations';
import { ShopifyProduct, ShopifyCollection, ShopifyCart } from './types';
import { Product, Collection } from '../types';
import { PRODUCTS, COLLECTIONS } from '../mockData';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || 'deadspinpickle-com.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'e8fd4433d3f742be095d8832e4cd69be';
const SHOPIFY_API_VERSION = '2024-01';

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  revalidate = 120,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number | false;
}): Promise<{ status: number; body: T } | never> {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      ...(revalidate !== false ? { next: { revalidate } } : { cache }),
    });

    const body = await response.json();

    if (body.errors) {
      console.warn('Shopify GraphQL warning:', body.errors[0].message);
    }

    return {
      status: response.status,
      body,
    };
  } catch (error) {
    console.error('Error executing Shopify query:', error);
    throw error;
  }
}

// Reshaper: Shopify GraphQL Product -> App Product
export function normalizeShopifyProduct(shopifyProduct: ShopifyProduct): Product {
  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    vendor: shopifyProduct.vendor,
    productType: shopifyProduct.productType,
    tags: shopifyProduct.tags,
    availableForSale: shopifyProduct.availableForSale,
    priceRange: {
      minVariantPrice: {
        amount: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
        currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
      },
    },
    compareAtPriceRange: shopifyProduct.compareAtPriceRange ? {
      minVariantPrice: {
        amount: parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount),
        currencyCode: shopifyProduct.compareAtPriceRange.minVariantPrice.currencyCode,
      }
    } : undefined,
    images: shopifyProduct.images.edges.map(edge => ({
      url: edge.node.url,
      altText: edge.node.altText || shopifyProduct.title,
      width: edge.node.width,
      height: edge.node.height,
    })),
    variants: shopifyProduct.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      price: {
        amount: parseFloat(edge.node.price.amount),
        currencyCode: edge.node.price.currencyCode,
      },
      selectedOptions: edge.node.selectedOptions,
    })),
  };
}

// Fetch all products (with fallback to catalog)
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await shopifyFetch<{ data: { products: { edges: { node: ShopifyProduct }[] } } }>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 50 },
      revalidate: 60,
    });

    const shopifyProducts = res.body?.data?.products?.edges?.map(e => normalizeShopifyProduct(e.node)) || [];
    // If shopify returns products, combine or return them; otherwise fallback to curated mock catalog
    return shopifyProducts.length > 0 ? shopifyProducts : PRODUCTS;
  } catch (e) {
    console.warn('Fallback to mock products due to API fetch error');
    return PRODUCTS;
  }
}

// Fetch single product by handle
export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    const res = await shopifyFetch<{ data: { product: ShopifyProduct | null } }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      revalidate: 60,
    });

    if (res.body?.data?.product) {
      return normalizeShopifyProduct(res.body.data.product);
    }
  } catch (e) {
    console.warn(`Fallback to mock product for handle ${handle}`);
  }

  return PRODUCTS.find(p => p.handle === handle);
}

// Cart API Client
export async function createCart(lines?: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart | null> {
  try {
    const res = await shopifyFetch<{ data: { cartCreate: { cart: ShopifyCart } } }>({
      query: CREATE_CART_MUTATION,
      variables: { lines: lines || [] },
      revalidate: false,
    });

    return res.body?.data?.cartCreate?.cart || null;
  } catch (error) {
    console.error('Error creating Shopify cart:', error);
    return null;
  }
}
