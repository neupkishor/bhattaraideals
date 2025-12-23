'use client';

import Link from 'next/link';
import {
  Briefcase,
  Smartphone,
  Phone,
  Mail,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useUser } from '@/firebase';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-current"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.61 15.35 3.48 16.82L2 22L7.33 20.58C8.75 21.37 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 3.67C16.56 3.67 20.28 7.39 20.28 11.91C20.28 16.43 16.56 20.15 12.04 20.15C10.48 20.15 9 19.73 7.75 19L7.29 18.73L4.93 19.34L5.58 17.06L5.29 16.59C4.42 15.19 3.8 13.58 3.8 11.91C3.8 7.39 7.52 3.67 12.04 3.67M9.1 7.23C8.89 7.23 8.7 7.42 8.54 7.75C8.38 8.08 7.82 9.03 7.82 10.1C7.82 11.17 8.56 12.2 8.71 12.38C8.87 12.56 10.27 14.81 12.52 15.73C14.44 16.54 15.11 16.23 15.63 16.17C16.23 16.1 17.22 15.52 17.46 14.85C17.7 14.18 17.7 13.61 17.59 13.43C17.48 13.25 17.32 13.16 17.09 13.04C16.86 12.92 15.68 12.34 15.45 12.25C15.22 12.16 15.06 12.11 14.9 12.35C14.74 12.59 14.24 13.17 14.08 13.34C13.92 13.52 13.76 13.57 13.53 13.45C13.3 13.33 12.42 13.04 11.38 12.12C10.56 11.41 10.03 10.56 9.87 10.29C9.71 10.02 9.83 9.87 9.97 9.75C10.09 9.64 10.25 9.45 10.41 9.29C10.57 9.13 10.62 9.01 10.72 8.84C10.82 8.67 10.77 8.52 10.7 8.43C10.63 8.34 10.04 6.89 9.81 6.3C9.58 5.71 9.35 5.59 9.1 5.59" />
  </svg>
);

export function Header() {
  const { user } = useUser();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 shadow-md'
      )}
    >
      <div className="bg-slate-800 text-white">
        <div className="container mx-auto flex h-10 items-center justify-between px-4 md:px-6 text-xs">
          <div className="flex items-center gap-4">
            <a
              href="tel:+9779840710507"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone />
              <span>+977 9840710507</span>
            </a>
            <a
              href="mailto:contact@bhattaraideals.com"
              className="hidden md:flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail />
              <span>contact@bhattaraideals.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Follow us:</span>
            <a
              href="https://wa.me/9779860729833"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-primary transition-colors"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center flex-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg font-headline"
            >
              <Smartphone className="h-6 w-6 text-primary-foreground" />
              <span>Bhattarai Deals</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium justify-center">
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
          <div className="flex items-center justify-end flex-1">
            <Button size="sm" asChild>
              <Link href="/#iphones">Shop iPhones</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
