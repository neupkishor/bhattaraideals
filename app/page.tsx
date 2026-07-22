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
    <main className="section-stack">
      <Hero />
      <ProductGrid
        products={iphones}
        title="iPhones"
        id="iphones"
        description="Browse verified iPhones with clear condition labels, fair local pricing, and availability you can trust before visiting or chatting with us."
        variant="carousel"
      />
      <ProductGrid
        products={accessories}
        title="AirPods & Accessories"
        id="accessories"
        description="Find original AirPods, MagSafe chargers, and everyday Apple essentials selected for compatibility, condition, and reliable local support."
      />
      <ProductGrid
        products={deals}
        title="Curated Deals"
        id="deals"
        description="Explore limited picks with stronger value, clean condition notes, and straightforward pricing for quick decisions."
      />
      <Testimonials testimonials={testimonials} />
      <SellYourDevice />
      <RepairServices />
    </main>
  );
}
