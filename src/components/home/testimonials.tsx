'use client';

import type { Testimonial } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 border-t bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          What Our Customers Say
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="h-full flex flex-col justify-between shadow-md rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-muted-foreground italic">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                    <div className="flex items-center gap-4 p-6 bg-muted/50 border-t rounded-b-2xl">
                      <Avatar>
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
