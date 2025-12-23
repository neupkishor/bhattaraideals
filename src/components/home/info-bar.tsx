import { Phone, CheckCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

const infoItems = [
  {
    icon: Phone,
    title: 'Prabesh Bhattarai',
    subtitle: '+977 9840710507',
    href: 'tel:+9779840710507',
  },
  {
    icon: CheckCircle,
    title: '70+',
    subtitle: 'iPhones Sold',
    href: '#iphones',
  },
  {
    icon: MapPin,
    title: 'Machhapokhari 16',
    subtitle: 'Kathmandu',
    href: 'https://maps.google.com/?q=Machhapokhari,Kathmandu',
  },
];

export function InfoBar() {
  return (
    <div className="bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative -mt-12 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl shadow-2xl bg-card border text-card-foreground overflow-hidden">
            {infoItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="flex items-center gap-4 p-6 hover:bg-muted/50 transition-colors group"
              >
                <div className="bg-primary/20 text-primary-foreground p-3 rounded-full">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
