import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-iphone');

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
          Buy, Sell, Repair and Exchange
          <br />
          your iPhone today!
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl mb-8 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-200">
          Discover certified pre-owned Apple products at unbeatable prices,
          with pickup and delivery right to your home. The most convenient
          service for all your iPhone needs is at your fingertips.
        </p>
        <div className="flex justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-500 delay-300">
          <Button size="lg" asChild>
            <Link href="/#iphones">Shop iPhones</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-foreground hover:bg-accent/10 hover:text-accent-foreground"
            asChild
          >
            <Link href="https://wa.me/9779860729833" target="_blank">Contact Now</Link>
          </Button>
        </div>
        {heroImage && (
          <div className="relative max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-400">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={1200}
              height={800}
              className="rounded-2xl shadow-2xl shadow-primary/20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
