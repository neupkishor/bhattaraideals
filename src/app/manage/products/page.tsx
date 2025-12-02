'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProductsPage() {
  const firestore = useFirestore();
  const productsCollection = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: products, isLoading } = useCollection<Product>(productsCollection);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(firestore, 'products', id));
        toast({ title: 'Product deleted successfully.' });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: 'Error deleting product.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button asChild>
          <Link href="/manage/products/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price (NRS)</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/manage/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.condition}</Badge>
                  </TableCell>
                  <TableCell>{product.availability}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/manage/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
