import { ComparisonTool } from '@/components/compare/comparison-tool';
import { products } from '@/lib/products';

export default function ComparePage() {
  const comparableProducts = products.filter((p) => p.category === 'iPhones');

  return (
    <div className="bg-background min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Smart Comparison
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Select two devices to see an AI-powered side-by-side comparison.
            </p>
          </div>
          <ComparisonTool products={comparableProducts} />
        </div>
      </div>
    </div>
  );
}
