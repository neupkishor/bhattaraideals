'use client';

import Link from 'next/link';
import { Briefcase, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-sm border-b shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg font-headline"
        >
          <Smartphone className="h-6 w-6 text-primary-foreground" />
          <span>Bhattarai Deals</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/#deals"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Deals
          </Link>
          <Link
            href="/compare"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Compare
          </Link>
          <Link
            href="/confidence"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Confidence
          </Link>
          {user && (
            <Link
              href="/manage"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              <Briefcase className="h-5 w-5" />
              <span className="sr-only">Manage</span>
            </Link>
          )}
        </nav>
        <Button size="sm" asChild>
          <Link href="/#iphones">Shop iPhones</Link>
        </Button>
      </div>
    </header>
  );
}
