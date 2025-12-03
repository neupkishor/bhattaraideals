'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quote: z.string().min(10, 'Quote must be at least 10 characters'),
  avatarUrl: z.string().url('Must be a valid URL for the avatar'),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function AddTestimonialPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsLoading(true);
    try {
      await addDoc(collection(firestore, 'testimonials'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Testimonial added successfully!' });
      router.push('/manage/testimonials');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast({ title: 'Error adding testimonial', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
       <Link href="/manage/testimonials" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Testimonials
      </Link>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                      <Textarea placeholder="The service was amazing..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Testimonial'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
