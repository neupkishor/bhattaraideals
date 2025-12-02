'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
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
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { MakeOfferDialog } from '@/components/products/make-offer-dialog';

export default function ProductPage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const productRef = useMemoFirebase(() => doc(firestore, 'products', id as string), [firestore, id]);
  const { data: product, isLoading } = useDoc<Product>(productRef);

  // This should fetch related products from Firestore
  // For now, we'll keep it simple and not show related products
  const relatedProducts: Product[] = [];

  if (isLoading) {
    return <div className="container mx-auto text-center py-20">Loading...</div>;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="aspect-square bg-card rounded-2xl flex items-center justify-center p-8 sticky top-24 shadow-md">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover"
              data-ai-hint={product.imageHint}
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
              <span className="text-4xl font-bold">NRS {product.price}</span>
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

            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="lg" className="flex-1">
                Buy Now
              </Button>
              <MakeOfferDialog product={product} />
            </div>

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
