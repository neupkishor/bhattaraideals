'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '../../lib/placeholder-images';

const whatsappNumber = '9779860729833';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-iphone');
  const buyLink = getWhatsAppLink('Hi Bhattarai Deals, I want to buy a device.');
  const sellLink = getWhatsAppLink('Hi Bhattarai Deals, I want to sell my device.');
  const repairLink = getWhatsAppLink('Hi Bhattarai Deals, I want to repair my device.');
  const exchangeLink = getWhatsAppLink('Hi Bhattarai Deals, I want to exchange my device.');
  const lavenderActionClass =
    'text-[hsl(264_60%_54%)] underline decoration-transparent underline-offset-8 transition-[color,text-decoration-color,text-underline-offset] duration-300 hover:text-[hsl(264_70%_40%)] hover:decoration-[hsl(264_60%_54%)] hover:underline-offset-4';

  return (
    <section className="relative bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className={lavenderActionClass}
              >
                Buy
              </a>
              ,{' '}
              <a
                href={sellLink}
                target="_blank"
                rel="noopener noreferrer"
                className={lavenderActionClass}
              >
                Sell
              </a>
              ,{' '}
              <a
                href={exchangeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={lavenderActionClass}
              >
                Exchange
              </a>{' '}
              and{' '}
              <a
                href={repairLink}
                target="_blank"
                rel="noopener noreferrer"
                className={lavenderActionClass}
              >
                Repair
              </a>
              <br />
              your{' '}
              <a href="#iphones" className={lavenderActionClass}>
                iPhone
              </a>{' '}
              today.
            </h1>
            <p className="max-w-xl text-muted-foreground md:text-xl mb-8 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-200">
              Discover certified pre-owned Apple products at unbeatable prices.
              The most convenient service for all your iPhone needs is at your
              fingertips.
            </p>
            <div className="flex flex-wrap justify-start gap-4 animate-in fade-in slide-in-from-bottom-12 duration-500 delay-300">
              <Button size="lg" asChild>
                <Link href={buyLink} target="_blank" rel="noopener noreferrer">
                  Buy iPhones
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={sellLink} target="_blank" rel="noopener noreferrer">
                  Sell Your Device
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-foreground hover:bg-accent/10 hover:text-accent-foreground"
                asChild
              >
                <Link href={repairLink} target="_blank" rel="noopener noreferrer">
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
