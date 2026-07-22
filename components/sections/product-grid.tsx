import { ProductCard } from './product-card';
import type { Product } from '../../lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type ProductGridProps = {
  products: Product[];
  title: string;
  id: string;
  description?: string;
  variant?: 'grid' | 'carousel';
};

export function ProductGrid({
  products,
  title,
  id,
  description,
  variant = 'grid',
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="section-block py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 max-w-3xl text-left">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {variant === 'carousel' ? (
          <Carousel
            opts={{
              align: 'start',
              loop: products.length > 4,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-[45%] bg-background/95 shadow-md md:-left-4" />
            <CarouselNext className="right-2 top-[45%] bg-background/95 shadow-md md:-right-4" />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
