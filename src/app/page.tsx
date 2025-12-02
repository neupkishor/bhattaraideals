'use client';
import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/products/product-grid';
import { SellYourDevice } from '@/components/home/sell-your-device';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Product } from '@/lib/types';

export default function Home() {
  const firestore = useFirestore();
  const productsCollection = useMemoFirebase(
    () => collection(firestore, 'products'),
    [firestore]
  );
  const { data: products, isLoading } = useCollection<Product>(productsCollection);

  const iphones = products?.filter((p) => p.category === 'iPhones') ?? [];
  const accessories = products?.filter((p) => p.category === 'AirPods' || p.category === 'Accessories') ?? [];
  const deals = products?.filter((p) => p.category === 'Deals') ?? [];

  return (
    <>
      <Hero />
      <div className="bg-background">
        {isLoading ? (
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
        <SellYourDevice />
      </div>
    </>
  );
}
