export interface ProductImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: number;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  vendor: string;
  productType: string;
  availableForSale: boolean;
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  handle: string;
  variantTitle: string;
  image?: ProductImage;
  price: {
    amount: number;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: number;
    currencyCode: string;
  };
  quantity: number;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ProductImage;
}
