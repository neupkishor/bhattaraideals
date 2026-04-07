'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddTestimonialPage() {
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
          <p className="text-muted-foreground">
            Testimonial creation is now read-only. Edit the local content source in src/lib/content.ts instead.
          </p>
          <Button asChild className="mt-6">
            <Link href="/manage/testimonials">Return to Testimonials</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
