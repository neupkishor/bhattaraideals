import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  condition: 'Brand New' | 'Like New' | 'Certified Used';
  availability: 'Available now' | 'Coming soon' | 'Out of stock';
  category: 'iPhones' | 'AirPods' | 'Accessories' | 'Deals';
  image: {
    src: string;
    hint: string;
  };
  specs?: {
    [key: string]: string;
  };
};

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

export const products: Product[] = [
  {
    id: 'iphone-15-pro-natural',
    name: 'iPhone 15 Pro',
    price: 999,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'iPhones',
    image: getImage('iphone-15-pro-natural'),
    specs: {
      Display: '6.1" Super Retina XDR',
      Chip: 'A17 Pro',
      Camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      Battery: 'Up to 23 hours video playback',
    },
  },
  {
    id: 'iphone-15-blue',
    name: 'iPhone 15',
    price: 799,
    condition: 'Like New',
    availability: 'Available now',
    category: 'iPhones',
    image: getImage('iphone-15-blue'),
    specs: {
      Display: '6.1" Super Retina XDR',
      Chip: 'A16 Bionic',
      Camera: '48MP Main, 12MP Ultra Wide',
      Battery: 'Up to 20 hours video playback',
    },
  },
  {
    id: 'iphone-14-pro-purple',
    name: 'iPhone 14 Pro',
    price: 899,
    condition: 'Certified Used',
    availability: 'Available now',
    category: 'iPhones',
    image: getImage('iphone-14-pro-purple'),
    specs: {
      Display: '6.1" Super Retina XDR',
      Chip: 'A16 Bionic',
      Camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      Battery: 'Up to 23 hours video playback',
    },
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd gen)',
    price: 249,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'AirPods',
    image: getImage('airpods-pro-2'),
  },
  {
    id: 'airpods-3',
    name: 'AirPods (3rd gen)',
    price: 169,
    condition: 'Like New',
    availability: 'Coming soon',
    category: 'AirPods',
    image: getImage('airpods-3'),
  },
  {
    id: 'power-bank-anker',
    name: 'Anker PowerCore 20K',
    price: 49,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'Deals',
    image: getImage('power-bank-anker'),
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    price: 799,
    condition: 'Like New',
    availability: 'Available now',
    category: 'Deals',
    image: getImage('apple-watch-ultra-2'),
  },
  {
    id: 'iphone-case-clear',
    name: 'Clear Case with MagSafe',
    price: 49,
    condition: 'Brand New',
    availability: 'Out of stock',
    category: 'Accessories',
    image: getImage('iphone-case-clear'),
  },
  {
    id: 'sony-headphones',
    name: 'Sony WH-1000XM5',
    price: 399,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'Deals',
    image: getImage('sony-headphones'),
  },
  {
    id: 'anker-charger',
    name: 'Anker 735 Charger',
    price: 59,
    condition: 'Brand New',
    availability: 'Available now',
    category: 'Accessories',
    image: getImage('anker-charger'),
  },
];
