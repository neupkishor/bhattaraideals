'use client';
import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/products/product-grid';
import { SellYourDevice } from '@/components/home/sell-your-device';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { Product, Testimonial } from '@/lib/types';
import { Testimonials } from '@/components/home/testimonials';
import { RepairServices } from '@/components/home/repair-services';

export default function Home() {
  const firestore = useFirestore();
  const productsCollection = useMemoFirebase(
    () => collection(firestore, 'products'),
    [firestore]
  );
  const testimonialsCollection = useMemoFirebase(
    () => query(collection(firestore, 'testimonials'), orderBy('createdAt', 'desc'), limit(5)),
    [firestore]
  );

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsCollection);
  const { data: testimonials, isLoading: isLoadingTestimonials } = useCollection<Testimonial>(testimonialsCollection);

  const iphones = products?.filter((p) => p.category === 'iPhones') ?? [];
  const accessories = products?.filter((p) => p.category === 'AirPods' || p.category === 'Accessories') ?? [];
  const deals = products?.filter((p) => p.category === 'Deals') ?? [];

  return (
    <>
      <Hero />
      <div className="bg-background">
        {isLoadingProducts ? (
          <div className="text-center py-24">Loading products...</div>
        ) : (
          <>
            <ProductGrid products={iphones} title="iPhones" id="iphones" />
            <ProductGrid
              products={accessories}
              title="AirPods & Accessories"
              id="accessories"
            />
            <ProductGrid products={deals} title="Curated Deals" id="deals" />
          </>
        )}
        {isLoadingTestimonials ? (
          <div className="text-center py-24">Loading testimonials...</div>
        ) : (
          <Testimonials testimonials={testimonials ?? []} />
        )}
        <SellYourDevice />
        <RepairServices />
      </div>
    </>
  );
}
