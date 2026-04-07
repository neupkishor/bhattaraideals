export type ProductCondition = 'Brand New' | 'Like New' | 'Certified Used';
export type ProductAvailability = 'Available now' | 'Coming soon' | 'Out of stock';

export type Product = {
  id: string;
  name: string;
  category: 'iPhones' | 'AirPods' | 'Accessories' | 'Deals' | string;
  price: number;
  imageUrl: string;
  imageHint: string;
  condition: ProductCondition;
  availability: ProductAvailability;
  specs?: Record<string, string>;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  avatarUrl: string;
};

export type PlaceholderImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
};