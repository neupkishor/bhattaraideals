'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-iphone');
  const whatsappLink = 'https://wa.me/9779860729833';
  const interactiveWordClass =
    'transition-colors hover:text-primary-foreground';

  return (
    <section className="bg-white pt-20 md:pt-32 relative pb-16">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={interactiveWordClass}
              >
                Buy
              </a>
              ,{' '}
              <a
                href="/sell"
                className={interactiveWordClass}
              >
                Sell
              </a>
              ,{' '}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={interactiveWordClass}
              >
                Repair
              </a>{' '}
              and{' '}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={interactiveWordClass}
              >
                Exchange
              </a>
              <br />
              your <span className="text-primary-foreground">iPhone</span> today!
            </h1>
            <p className="max-w-xl text-muted-foreground md:text-xl mb-8 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-200">
              Discover certified pre-owned Apple products at unbeatable prices.
              The most convenient service for all your iPhone needs is at your
              fingertips.
            </p>
            <div className="flex flex-wrap justify-start gap-4 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-500 delay-300">
              <Button size="lg" asChild>
                <Link href={whatsappLink} target="_blank">
                  Buy iPhones
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sell">Sell Your Device</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-foreground hover:bg-accent/10 hover:text-accent-foreground"
                asChild
              >
                <Link href={whatsappLink} target="_blank">
                  Request a Repair
                </Link>
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
