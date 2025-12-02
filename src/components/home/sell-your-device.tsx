import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function SellYourDevice() {
  return (
    <section id="sell" className="py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-card overflow-hidden shadow-lg border-primary/20">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Sell Your Device or Accessories
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Got an old phone, laptop, or accessory lying around? Turn it into
                cash. We offer competitive prices and a hassle-free process.
              </p>
              <Button size="lg" asChild>
                <Link href="/sell">
                  Get a Free Quote <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
            <div className="bg-primary/10 h-full flex items-center justify-center p-8">
                <img src="https://images.unsplash.com/photo-1621364923332-5a9a44fe8549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdGFjayUyMG9mJTIwaXBob25lc3xlbnwwfHx8fDE3NjQ2NTI5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="A stack of used phones" className="rounded-lg object-cover shadow-xl" data-ai-hint="stack phones" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
