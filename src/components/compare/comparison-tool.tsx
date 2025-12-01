'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import type { Product } from '@/lib/products';
import { getComparison } from '@/app/compare/actions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Generating...' : 'Compare Devices'}
    </Button>
  );
}

export function ComparisonTool({ products }: { products: Product[] }) {
  const initialState = { message: null, comparison: null };
  const [state, formAction] = useFormState(getComparison, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Comparison generated.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 md:p-8">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="device1"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Device 1
              </label>
              <Select name="device1" required>
                <SelectTrigger id="device1">
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.condition})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="device2"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Device 2
              </label>
              <Select name="device2" required>
                <SelectTrigger id="device2">
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.condition})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <SubmitButton />
        </form>

        {state.comparison && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-headline text-2xl font-bold mb-4">
              AI-Powered Comparison
            </h3>
            <div
              className="text-foreground/90 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: state.comparison.replace(/\n/g, '<br />'),
              }}
            ></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
