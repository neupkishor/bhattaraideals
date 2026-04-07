import { SellForm } from '@/components/sell/sell-form';

export default function SellPage() {
  return (
    <div className="bg-background min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Sell Your Device
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a great price for your used electronics. Fill out the form
              below to get started.
            </p>
          </div>
          <SellForm />
        </div>
      </div>
    </div>
  );
}
