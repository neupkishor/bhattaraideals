import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ProgressBar } from '@/components/layout/progress-bar';
import { SiteHeadBody, SiteHeadHead } from '@/components/sitehead/sitehead';

export const metadata: Metadata = {
  title: 'Bhattarai Deals',
  description: 'Premium Devices. Simple Prices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <SiteHeadHead />
      </head>
      <body className="font-body antialiased">
        <ProgressBar />
        <Header />
        <main className="min-h-screen">
          <SiteHeadBody>{children}</SiteHeadBody>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
