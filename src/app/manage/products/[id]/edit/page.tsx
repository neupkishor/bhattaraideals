'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditProductPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link href="/manage/products" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Product editing is read-only now. Update the local content source instead.
          </p>
          <Button asChild className="mt-6">
            <Link href="/manage/products">Return to Products</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
