import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('py-4', className)}>
      <ol className="flex flex-wrap items-center space-x-2 font-sans text-xs uppercase tracking-widest text-[#1A1A1A]/50">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {isLast || !item.href ? (
                <span className="text-[#1A1A1A]" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#1A1A1A] transition-colors"
                >
                  {item.label}
                </Link>
              )}
              
              {!isLast && (
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
