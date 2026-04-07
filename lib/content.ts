import { products } from './products';
import type { Testimonial } from './types';

export { products };

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Rajan K.',
    quote: 'Fast response, fair pricing, and my phone looked brand new after repair.',
    avatarUrl: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 't-2',
    name: 'Sushma P.',
    quote: 'Sold my old iPhone in a day. Super smooth process and instant payment.',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: 't-3',
    name: 'Nabin T.',
    quote: 'Got a great deal on a certified device. Battery health and condition were exactly as promised.',
    avatarUrl: 'https://i.pravatar.cc/100?img=18',
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id) ?? null;
}