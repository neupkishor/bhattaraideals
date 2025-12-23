import { cn } from '@/lib/utils';
import Link from 'next/link';

type FloatingCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function FloatingCard({
  children,
  className,
  href,
}: FloatingCardProps) {
  const commonClasses =
    'absolute bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 flex items-center gap-3 transition-transform hover:scale-105 hover:shadow-xl';

  const content = (
    <div className={cn(commonClasses, className)}>{children}</div>
  );

  if (href) {
    return (
      <Link href={href} className="hidden md:block">
        {content}
      </Link>
    );
  }

  return <div className="hidden md:block">{content}</div>;
}
