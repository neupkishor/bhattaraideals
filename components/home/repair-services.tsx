import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Wrench, Package, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export function RepairServices() {
  return (
    <section id="repair" className="py-16 md:py-24 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-card overflow-hidden shadow-lg border-primary/20">
          <div className="grid md:grid-cols-2 items-center">
             <div className="bg-primary/10 h-full flex items-center justify-center p-8">
                <Image 
                    src="https://images.unsplash.com/photo-1596043183577-b8adea445a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjByZXBhaXJ8ZW58MHx8fHwxNzM3NzA5ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="iPhone repair tools" 
                    className="rounded-lg object-cover shadow-xl"
                    width={500}
                    height={500}
                    data-ai-hint="iphone repair" />
            </div>
            <div className="p-8 md:p-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
                <Wrench className="h-8 w-8 text-primary-foreground" />
                iPhone Repair Services
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Cracked screen? Battery issues? Our certified technicians can fix it. Describe your problem to get a cost breakdown and schedule your repair.
              </p>
               <ul className="space-y-4 mb-8 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary-foreground" />
                    <span>Free pickup and delivery service.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                    <span>Get a detailed cost breakdown before you commit.</span>
                  </li>
                </ul>
              <Button size="lg" asChild>
                <Link href="https://wa.me/9779860729833" target="_blank">
                  Request a Repair <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
