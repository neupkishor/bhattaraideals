import type { Metadata } from 'next';
import { BaseLayout } from '@/components/layout/base';

export const metadata: Metadata = {
  title: 'Bhattarai Deals',
  description: 'Premium Devices. Simple Prices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout>{children}</BaseLayout>;
}
