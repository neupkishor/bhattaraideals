'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../../../../lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '../../../../hooks/use-toast';
import { getProductById } from '../../../../lib/content';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = id ? getProductById(id as string) : null;
  const { toast } = useToast();

  const handleDelete = async () => {
    toast({ title: 'Read-only mode', description: 'Delete is disabled after removing Firebase.' });
  };

  if (!product) {
    return <div className="container p-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link href="/manage/products" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{product.name}</CardTitle>
              <CardDescription>Product ID: {product.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/manage/products/${product.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg object-cover w-full aspect-square"
              />
            </div>
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    <TableCell>NRS {product.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Condition</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.condition}</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Availability</TableCell>
                    <TableCell>{product.availability}</TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell className="font-medium">Category</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
               {product.specs && (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                     <Table>
                        <TableBody>
                        {Object.entries(product.specs).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell className="font-medium text-muted-foreground">{key}</TableCell>
                                <TableCell>{value as string}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
