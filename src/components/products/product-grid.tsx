import { ProductCard } from './product-card';
import type { Product } from '@/lib/products';

type ProductGridProps = {
  products: Product[];
  title: string;
  id: string;
};

export function ProductGrid({ products, title, id }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
