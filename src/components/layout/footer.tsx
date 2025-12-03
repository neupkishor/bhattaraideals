import Link from 'next/link';
import { Smartphone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-primary-foreground" />
            <span className="font-bold text-lg font-headline">
              Bhattarai Deals
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/#iphones" className="hover:text-foreground">
              Buy
            </Link>
             <Link href="/sell" className="hover:text-foreground">
              Sell
            </Link>
             <Link href="/#repair" className="hover:text-foreground">
              Repair
            </Link>
            <Link href="/compare" className="hover:text-foreground">
              Compare
            </Link>
            <Link href="/confidence" className="hover:text-foreground">
              Warranty
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bhattarai Deals. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
