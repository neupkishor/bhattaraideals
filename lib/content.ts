import { products as catalogProducts } from './products';
import type { Inquiry, Product, SellRequest, Testimonial } from './types';

export const products: Product[] = catalogProducts.map((product, index) => {
  const id = `product-${index + 1}`;
  const image = product.name === 'iPhone 15 Pro'
    ? { src: 'https://picsum.photos/seed/iphone-15-pro/800/800', hint: 'premium smartphone' }
    : product.name === 'iPhone 15'
    ? { src: 'https://picsum.photos/seed/iphone-15/800/800', hint: 'modern smartphone' }
    : product.name === 'iPhone 14 Pro'
    ? { src: 'https://picsum.photos/seed/iphone-14-pro/800/800', hint: 'smartphone display' }
    : product.name === 'AirPods Pro (2nd gen)'
    ? { src: 'https://picsum.photos/seed/airpods-pro/800/800', hint: 'wireless earbuds' }
    : product.name === 'AirPods (3rd gen)'
    ? { src: 'https://picsum.photos/seed/airpods/800/800', hint: 'wireless earbuds' }
    : product.name === 'Anker PowerCore 20K'
    ? { src: 'https://picsum.photos/seed/powerbank/800/800', hint: 'portable power bank' }
    : product.name === 'Apple Watch Ultra 2'
    ? { src: 'https://picsum.photos/seed/apple-watch-ultra/800/800', hint: 'smartwatch' }
    : product.name === 'Clear Case with MagSafe'
    ? { src: 'https://picsum.photos/seed/magsafe-case/800/800', hint: 'phone case' }
    : product.name === 'Sony WH-1000XM5'
    ? { src: 'https://picsum.photos/seed/sony-headphones/800/800', hint: 'wireless headphones' }
    : { src: 'https://picsum.photos/seed/charger/800/800', hint: 'phone accessory' };

  return {
    ...product,
    id,
    imageUrl: image.src,
    imageHint: image.hint,
  };
});

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sushila Shrestha',
    quote: 'Clear pricing, fast responses, and the device was exactly as described.',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    createdAt: new Date('2026-03-18T10:30:00Z'),
  },
  {
    id: 'testimonial-2',
    name: 'Aman Rai',
    quote: 'The checkout experience was simple and the product arrived in perfect condition.',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    createdAt: new Date('2026-03-25T14:15:00Z'),
  },
  {
    id: 'testimonial-3',
    name: 'Priya Karki',
    quote: 'Helpful guidance on choosing the right model. I would buy here again.',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    createdAt: new Date('2026-04-02T08:00:00Z'),
  },
];

export const inquiries: Inquiry[] = [
  {
    id: 'inquiry-1',
    productId: 'product-1',
    userId: 'customer-101',
    productName: 'iPhone 15 Pro',
    userEmail: 'sabin@example.com',
    offerAmount: 920,
    message: 'Can you hold this until Friday?',
    inquiryDate: new Date('2026-04-04T09:20:00Z'),
  },
  {
    id: 'inquiry-2',
    productId: 'product-4',
    userId: 'customer-102',
    productName: 'AirPods Pro (2nd gen)',
    userEmail: 'mira@example.com',
    offerAmount: 220,
    message: 'Is this sealed and under warranty?',
    inquiryDate: new Date('2026-04-05T13:45:00Z'),
  },
];

export const requests: SellRequest[] = [
  {
    id: 'request-1',
    name: 'Bikash',
    email: 'bikash@example.com',
    phone: '9840012345',
    deviceType: 'phone',
    deviceSubType: 'iOS',
    photoUrl: 'https://picsum.photos/seed/request-1/1200/1200',
    originalFilename: 'iphone-photo.jpg',
    requestDate: new Date('2026-04-03T11:00:00Z'),
  },
  {
    id: 'request-2',
    name: 'Anita',
    email: 'anita@example.com',
    phone: '9801122334',
    deviceType: 'accessory',
    deviceSubType: 'Case',
    photoUrl: 'https://picsum.photos/seed/request-2/1200/1200',
    originalFilename: 'case-photo.jpg',
    requestDate: new Date('2026-04-06T15:10:00Z'),
  },
];

export const getProductById = (id: string) => products.find((product) => product.id === id);
export const getInquiryById = (id: string) => inquiries.find((inquiry) => inquiry.id === id);
export const getRequestById = (id: string) => requests.find((request) => request.id === id);
export const getTestimonialById = (id: string) => testimonials.find((testimonial) => testimonial.id === id);