import { Timestamp } from 'firebase/firestore';

export type Product = {
  id: string;
  name: string;
  price: number;
  condition: 'Brand New' | 'Like New' | 'Certified Used';
  availability: 'Available now' | 'Coming soon' | 'Out of stock';
  category: 'iPhones' | 'AirPods' | 'Accessories' | 'Deals';
  imageUrl: string;
  imageHint: string;
  specs?: {
    [key: string]: string;
  };
};

export type Inquiry = {
  id: string;
  productId: string;
  userId: string;
  message: string;
  offerAmount: number;
  inquiryDate: Timestamp;
  productName?: string;
  userEmail?: string;
};

export type SellRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  deviceType: string;
  deviceSubType: string;
  photoUrl: string;
  requestDate: Timestamp;
  originalFilename?: string;
};
