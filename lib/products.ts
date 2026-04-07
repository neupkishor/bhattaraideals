import type { Product } from './types';

export type { Product } from './types';

export const products: Product[] = [
  {
    id: 'iphone-15-pro-max-256-natural',
    name: 'iPhone 15 Pro Max 256GB',
    category: 'iPhones',
    price: 189000,
    imageUrl:
      'https://images.unsplash.com/photo-1705348988208-20d7965f1b26?auto=format&fit=crop&w=1000&q=80',
    imageHint: 'iphone 15 pro max',
    condition: 'Like New',
    availability: 'Available now',
    specs: {
      Chip: 'A17 Pro',
      Storage: '256GB',
      Display: '6.7-inch Super Retina XDR',
      Camera: '48MP main + 5x telephoto',
      Battery: 'Up to 29 hours video playback',
    },
  },
  {
    id: 'iphone-14-128-midnight',
    name: 'iPhone 14 128GB',
    category: 'iPhones',
    price: 112000,
    imageUrl:
      'https://images.unsplash.com/photo-1663499482523-2a1f80f6af6f?auto=format&fit=crop&w=1000&q=80',
    imageHint: 'iphone 14',
    condition: 'Certified Used',
    availability: 'Available now',
    specs: {
      Chip: 'A15 Bionic',
      Storage: '128GB',
      Display: '6.1-inch Super Retina XDR',
      Camera: 'Dual 12MP cameras',
      Battery: 'Up to 20 hours video playback',
    },
  },
  {
    id: 'airpods-pro-2-usbc',
    name: 'AirPods Pro (2nd Gen, USB-C)',
    category: 'AirPods',
    price: 39500,
    imageUrl:
      'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&w=1000&q=80',
    imageHint: 'airpods pro',
    condition: 'Brand New',
    availability: 'Available now',
    specs: {
      Audio: 'Active Noise Cancellation',
      Charging: 'USB-C / MagSafe case',
      Battery: 'Up to 6 hours listening time',
    },
  },
  {
    id: 'magsafe-charger',
    name: 'MagSafe Charger',
    category: 'Accessories',
    price: 8500,
    imageUrl:
      'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=1000&q=80',
    imageHint: 'magsafe charger',
    condition: 'Brand New',
    availability: 'Coming soon',
    specs: {
      Output: 'Up to 15W',
      Connector: 'USB-C',
      Compatibility: 'iPhone 12 or later',
    },
  },
  {
    id: 'iphone-13-mini-deal',
    name: 'iPhone 13 mini 128GB (Deal)',
    category: 'Deals',
    price: 76000,
    imageUrl:
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=1000&q=80',
    imageHint: 'iphone 13 mini',
    condition: 'Like New',
    availability: 'Available now',
    specs: {
      Chip: 'A15 Bionic',
      Storage: '128GB',
      Display: '5.4-inch Super Retina XDR',
    },
  },
];