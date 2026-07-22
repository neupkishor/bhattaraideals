
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Smartphone,
} from 'lucide-react';

const quickLinks = [
  { href: '/#deals', label: 'Deals' },
  { href: '/about', label: 'About' },
  { href: '/compare', label: 'Compare' },
  { href: '/confidence', label: 'Warranty' },
];

const services = [
  { href: '/#iphones', label: 'Buy iPhones' },
  { href: '/sell', label: 'Sell your device' },
  { href: '/#repair', label: 'Repair service' },
  { href: 'https://wa.me/9779860729833', label: 'Exchange device' },
];

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-slate-950">
                <Smartphone className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-headline text-xl font-bold text-white">
                  Bhattarai Deals
                </span>
                <span className="text-sm text-slate-400">Balaju, Kathmandu</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Trusted deals for buying, selling, repairing, and exchanging
              phones, iPhones, MacBooks, and Macs in Kathmandu.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="https://wa.me/9779860729833"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:bg-white hover:text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:bg-white hover:text-slate-950"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:bg-white hover:text-slate-950"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Quick Links</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Services</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              {services.map((service) => (
                <Link
                  key={service.label}
                  href={service.href}
                  target={service.href.startsWith('http') ? '_blank' : undefined}
                  rel={service.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="transition-colors hover:text-white"
                >
                  {service.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a
                href="tel:+9779860729833"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-slate-500" />
                +977 9860729833
              </a>
              <a
                href="mailto:contact@bhattaraideals.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-slate-500" />
                contact@bhattaraideals.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                Balaju, Kathmandu
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Bhattarai Deals. All Rights
            Reserved.
          </p>
          <p>Buy. Sell. Repair. Exchange.</p>
        </div>
      </div>
    </footer>
  );
}
