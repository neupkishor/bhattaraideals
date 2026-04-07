import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/products/product-grid';
import { SellYourDevice } from '@/components/home/sell-your-device';
import { products, testimonials } from '../lib/content';
import { Testimonials } from '@/components/home/testimonials';
import { RepairServices } from '@/components/home/repair-services';

export default function Home() {
  const iphones = products.filter((product) => product.category === 'iPhones');
  const accessories = products.filter((product) => product.category === 'AirPods' || product.category === 'Accessories');
  const deals = products.filter((product) => product.category === 'Deals');

  return (
    <>
      <Hero />
      <div className="bg-background">
        <ProductGrid products={iphones} title="iPhones" id="iphones" />
        <ProductGrid products={accessories} title="AirPods & Accessories" id="accessories" />
        <ProductGrid products={deals} title="Curated Deals" id="deals" />
        <Testimonials testimonials={testimonials} />
        <SellYourDevice />
        <RepairServices />
      </div>
    </>
  );
}
