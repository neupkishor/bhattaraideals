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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Testimonial } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quote: z.string().min(10, 'Quote must be at least 10 characters'),
  avatarUrl: z.string().url('Must be a valid URL for the avatar'),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const firestore = useFirestore();
  const testimonialRef = useMemoFirebase(() => doc(firestore, 'testimonials', id as string), [firestore, id]);
  const { data: testimonial, isLoading: isDocLoading } = useDoc<Testimonial>(testimonialRef);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
  });

  useEffect(() => {
    if (testimonial) {
      form.reset(testimonial);
    }
  }, [testimonial, form]);

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsSubmitting(true);
    try {
      await updateDoc(testimonialRef, data);
      toast({ title: 'Testimonial updated successfully!' });
      router.push(`/manage/testimonials`);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({ title: 'Error updating testimonial', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDocLoading) {
    return <div className="container p-8">Loading testimonial...</div>;
  }
  
  if (!testimonial) {
     return <div className="container p-8">Testimonial not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link href="/manage/testimonials" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Testimonials
      </Link>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Testimonial</CardTitle>
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                       <Textarea {...field} rows={5} />
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
