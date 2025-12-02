import { PlaceHolderImages } from './placeholder-images';
import type { Product } from './types';

const getImage = (id: string) => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    console.error(`Image with id ${id} not found. Using default.`);
    return {
      src: 'https://picsum.photos/seed/error/800/800',
      hint: 'placeholder',
    };
  }
  return { src: img.imageUrl, hint: img.imageHint };
};

export const products: Omit<Product, 'id' | 'imageUrl' | 'imageHint'>[] = [
  {
    name: 'iPhone 15 Pro',
    price: 999,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'iPhones',
    specs: {
      Display: '6.1" Super Retina XDR',
      Chip: 'A17 Pro',
      Camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      Battery: 'Up to 23 hours video playback',
    },
  },
  {
    name: 'iPhone 15',
    price: 799,
    condition: 'Like New',
    availability: 'Available now',
    category: 'iPhones',
    specs: {
      Display: '6.1" Super Retina XDR',
      Chip: 'A16 Bionic',
      Camera: '48MP Main, 12MP Ultra Wide',
      Battery: 'Up to 20 hours video playback',
    },
  },
  {
    name: 'iPhone 14 Pro',
    price: 899,
    condition: 'Certified Used',
    availability: 'Available now',
    category: 'iPhones',
    specs: {
      Display: '6.1" Super Retina XDR',
      Chip: 'A16 Bionic',
      Camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      Battery: 'Up to 23 hours video playback',
    },
  },
  {
    name: 'AirPods Pro (2nd gen)',
    price: 249,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'AirPods',
  },
  {
    name: 'AirPods (3rd gen)',
    price: 169,
    condition: 'Like New',
    availability: 'Coming soon',
    category: 'AirPods',
  },
  {
    name: 'Anker PowerCore 20K',
    price: 49,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'Deals',
  },
  {
    name: 'Apple Watch Ultra 2',
    price: 799,
    condition: 'Like New',
    availability: 'Available now',
    category: 'Deals',
  },
  {
    name: 'Clear Case with MagSafe',
    price: 49,
    condition: 'Brand New',
    availability: 'Out of stock',
    category: 'Accessories',
  },
  {
    name: 'Sony WH-1000XM5',
    price: 399,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'Deals',
  },
  {
    name: 'Anker 735 Charger',
    price: 59,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'Accessories',
  },
];
