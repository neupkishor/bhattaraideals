import { Hero } from '@/components/sections/hero';
import { ProductGrid } from '@/components/sections/product-grid';
import { SellYourDevice } from '@/components/sections/sell-your-device';
import { products, testimonials } from '../lib/content';
import { Testimonials } from '@/components/sections/testimonials';
import { RepairServices } from '@/components/sections/repair-services';

export default function Home() {
  const iphones = products.filter((product) => product.category === 'iPhones');
  const accessories = products.filter((product) => product.category === 'AirPods' || product.category === 'Accessories');
  const deals = products.filter((product) => product.category === 'Deals');

  return (
    <>
      <Hero />
      <div className="bg-background">
        <ProductGrid
          products={iphones}
          title="iPhones"
          id="iphones"
          description="Browse verified iPhones with clear condition labels, fair local pricing, and availability you can trust before visiting or chatting with us."
          variant="carousel"
        />
        <ProductGrid products={accessories} title="AirPods & Accessories" id="accessories" />
        <ProductGrid products={deals} title="Curated Deals" id="deals" />
        <Testimonials testimonials={testimonials} />
        <SellYourDevice />
        <RepairServices />
      </div>
    </>
  );
}
