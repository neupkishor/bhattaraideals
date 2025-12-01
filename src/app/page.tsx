import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/products/product-grid';
import { products } from '@/lib/products';

export default function Home() {
  const iphones = products.filter((p) => p.category === 'iPhones');
  const accessories = products.filter(
    (p) => p.category === 'AirPods' || p.category === 'Accessories'
  );
  const deals = products.filter((p) => p.category === 'Deals');

  return (
    <>
      <Hero />
      <div className="bg-background">
        <ProductGrid products={iphones} title="iPhones" id="iphones" />
        <ProductGrid
          products={accessories}
          title="AirPods & Accessories"
          id="accessories"
        />
        <ProductGrid products={deals} title="Curated Deals" id="deals" />
      </div>
    </>
  );
}
