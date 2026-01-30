
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const coreValues = [
    {
        title: 'Quality Assurance',
        description: 'Every device undergoes a rigorous 70-point inspection to ensure it meets the highest standards of performance and reliability.',
    },
    {
        title: 'Customer Trust',
        description: 'We build lasting relationships through transparent pricing, honest communication, and a solid warranty on all our products.',
    },
    {
        title: 'Expert Service',
        description: 'Our team of certified technicians provides expert repairs and support, ensuring your devices are always in good hands.',
    },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">Our Story</Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            The New Standard for Pre-Owned Apple Devices
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Bhattarai Deals started with a simple mission: to make premium technology accessible and affordable for everyone in Nepal. We saw a gap in the market for a trusted source of pre-owned Apple products—a place where customers could shop with the same confidence as buying new.
          </p>
        </div>

        <div className="relative mb-16 md:mb-24">
            <Image 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjdXN0b21lciUyMHNlcnZpY2V8ZW58MHx8fHwxNzM3NzA5ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Bhattarai Deals storefront"
                width={1200}
                height={600}
                className="rounded-2xl object-cover aspect-[2/1] shadow-lg"
                data-ai-hint="customer service"
            />
        </div>

        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                    Our Commitment to You
                </h2>
                 <p className="mt-4 text-lg text-muted-foreground">
                    We are more than just a store; we are your partners in technology.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {coreValues.map((value) => (
                    <div key={value.title} className="bg-card p-6 rounded-2xl shadow-sm border">
                        <CheckCircle className="h-8 w-8 text-primary-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
