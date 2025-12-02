import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/products';
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
        'border',
        condition === 'Brand New' &&
          'bg-accent/80 border-accent text-accent-foreground',
        condition === 'Like New' &&
          'bg-primary/80 border-primary text-primary-foreground',
        condition === 'Certified Used' && 'border-foreground/50'
      )}
    >
      {condition}
    </Badge>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-square bg-white relative">
            <Image
              src={product.image.src}
              alt={product.name}
              fill
              className="object-cover p-8 transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.image.hint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6 bg-white border-t">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-headline font-semibold text-lg">
                {product.name}
              </h3>
              <p className="font-semibold text-lg text-primary-foreground whitespace-nowrap">
                NRS {product.price}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <ConditionBadge condition={product.condition} />
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
  );
}
