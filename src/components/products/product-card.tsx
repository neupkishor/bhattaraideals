import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ConditionBadgeProps = {
  condition: Product['condition'];
};

function ConditionBadge({ condition }: ConditionBadgeProps) {
  const variant = {
    'Brand New': 'default',
    'Like New': 'secondary',
    'Certified Used': 'outline',
  }[condition] as 'default' | 'secondary' | 'outline' | undefined;

  return (
    <Badge
      variant={variant}
      className={cn(
        'border absolute top-4 left-4 z-10',
        condition === 'Brand New' &&
          'bg-accent/80 border-accent text-accent-foreground',
        condition === 'Like New' &&
          'bg-primary/80 border-primary text-primary-foreground',
        condition === 'Certified Used' && 'border-foreground/50 bg-card'
      )}
    >
      {condition}
    </Badge>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col">
      <ConditionBadge condition={product.condition} />
      <Link
        href={`/products/${product.id}`}
        className="block flex-grow h-full"
      >
        <Card className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
          <CardContent className="p-0 flex-grow flex flex-col">
            <div className="aspect-square bg-white relative overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={product.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 bg-white border-t flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-headline font-semibold text-lg">
                  {product.name}
                </h3>
              </div>
              <div className="flex justify-between items-end mt-4">
                <p className="font-semibold text-lg text-primary-foreground whitespace-nowrap">
                  NRS {product.price}
                </p>
                <p
                  className={cn(
                    'text-sm font-medium',
                    product.availability === 'Available now' && 'text-chart-2',
                    product.availability === 'Coming soon' && 'text-chart-4',
                    product.availability === 'Out of stock' && 'text-chart-1'
                  )}
                >
                  {product.availability}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
