import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FloatingCard } from './floating-card';
import { BadgeCheck, Phone } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-iphone');

  return (
    <section className="bg-white py-20 md:py-32 relative overflow-hidden">
      {/* Floating cards */}
      <FloatingCard
        className="top-1/4 left-[5%] animate-float"
        href="tel:+9779840710507"
      >
        <Phone className="h-6 w-6 text-blue-500" />
        <div className="text-left">
          <p className="font-bold">Prabesh Bhattarai</p>
          <p className="text-sm text-muted-foreground">+977 9840710507</p>
        </div>
      </FloatingCard>

      <FloatingCard className="top-1/3 right-[5%] animate-float [animation-delay:-4s]">
        <BadgeCheck className="h-6 w-6 text-green-500" />
        <div>
          <p className="font-bold text-lg">70+</p>
          <p className="text-sm text-muted-foreground">iPhones Sold</p>
        </div>
      </FloatingCard>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
              Buy, Sell, Repair and Exchange
              <br />
              your iPhone today!
            </h1>
            <p className="max-w-xl text-muted-foreground md:text-xl mb-8 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-200">
              Discover certified pre-owned Apple products at unbeatable prices,
              with pickup and delivery right to your home. The most convenient
              service for all your iPhone needs is at your fingertips.
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-500 delay-300">
              <Button size="lg" asChild>
                <Link href="https://wa.me/9779860729833" target="_blank">Buy iPhones</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://wa.me/9779860729833" target="_blank">Sell Your Device</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-foreground hover:bg-accent/10 hover:text-accent-foreground"
                asChild
              >
                <Link href="https://wa.me/9779860729833" target="_blank">Request a Repair</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-400">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={800}
                className="rounded-2xl shadow-2xl shadow-primary/20"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
