import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { ProductGrid } from '@/components/products/product-grid';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (p) => p.category === product?.category && p.id !== product?.id
    )
    .slice(0, 3);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="aspect-square bg-card rounded-2xl flex items-center justify-center p-8 sticky top-24 shadow-md">
            <Image
              src={product.image.src}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain"
              data-ai-hint={product.image.hint}
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline">{product.category}</Badge>
              <h1 className="font-headline text-3xl md:text-4xl font-bold">
                {product.name}
              </h1>
              <p className="text-muted-foreground">
                Condition: {product.condition}
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold">${product.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'font-semibold',
                  product.availability === 'Available now'
                    ? 'text-chart-2'
                    : product.availability === 'Coming soon'
                    ? 'text-chart-4'
                    : 'text-chart-1'
                )}
              >
                {product.availability}
              </span>
            </div>

            <Button size="lg" className="w-full">
              Add to Cart
            </Button>

            {product.specs && (
              <div className="pt-6 border-t">
                <h3 className="font-headline font-semibold text-lg mb-2">
                  Specifications
                </h3>
                <Table>
                  <TableBody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium text-muted-foreground">
                          {key}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="bg-background">
          <ProductGrid
            products={relatedProducts}
            title="Related Products"
            id="related"
          />
        </div>
      )}
    </div>
  );
}
