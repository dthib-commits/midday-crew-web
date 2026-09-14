export type Category = 'all' | 'caps' | 'apparel' | 'canvas' | 'accessories' | 'b2b';

export interface Product {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  handle: string;
  category: Category;
  price: number;
  colorway: string;
  threadColor: string;
  undervisorColor: string;
  fabrication: string;
  hardware: string;
  description: string;
  catalogStory: string;
  stylingNotes: string;
  images: string[];
  badges: string[];
  inStock: boolean;
  featured?: boolean;
  specs: {
    label: string;
    value: string;
  }[];
  sizes?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  sku: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  colorway: string;
  size?: string;
  customMonogram?: string;
  quantity: number;
}

export interface B2BClosingCrateRequest {
  dealCodeName: string;
  targetQuarter: string;
  teamSize: number;
  contactName: string;
  contactEmail: string;
  firmName: string;
  notes?: string;
}
