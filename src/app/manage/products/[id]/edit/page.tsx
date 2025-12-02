'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  condition: z.enum(['Brand New', 'Like New', 'Certified Used']),
  availability: z.enum(['Available now', 'Coming soon', 'Out of stock']),
  category: z.enum(['iPhones', 'AirPods', 'Accessories', 'Deals']),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().optional(),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const firestore = useFirestore();
  const productRef = useMemoFirebase(() => doc(firestore, 'products', id as string), [firestore, id]);
  const { data: product, isLoading: isDocLoading } = useDoc<Product>(productRef);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      form.reset(product);
    }
  }, [product, form]);

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      await updateDoc(productRef, data);
      toast({ title: 'Product updated successfully!' });
      router.push(`/manage/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({ title: 'Error updating product', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDocLoading) {
    return <div className="container p-8">Loading product...</div>;
  }
  
  if (!product) {
     return <div className="container p-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (NRS)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Brand New">Brand New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Certified Used">Certified Used</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Available now">Available now</SelectItem>
                          <SelectItem value="Coming soon">Coming soon</SelectItem>
                          <SelectItem value="Out of stock">Out of stock</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="iPhones">iPhones</SelectItem>
                           <SelectItem value="AirPods">AirPods</SelectItem>
                           <SelectItem value="Accessories">Accessories</SelectItem>
                           <SelectItem value="Deals">Deals</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
