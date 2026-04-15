// components/BrandsHeader/BrandsHeader.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BrandsHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  icon?: ReactNode;
  gradient?: string;      
}

export default function BrandsHeader({
  title,
  description = "Discover premium brands and shop with confidence",
  breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Brands" }
  ],
  icon,
  gradient = "from-violet-600 via-violet-500 to-purple-400",
}: BrandsHeaderProps) {
  return (
    <div className={`bg-linear-to-br ${gradient} text-white`}>
      <div className="container mx-auto px-4 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <span className="text-white/40">/</span>
              )}
            </span>
          ))}
        </nav>

        {/* Content */}
        <div className="flex items-center gap-5">
          {/* Icon Container */}
          {icon && (
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0">
              {icon}
            </div>
          )}

          {/* Title & Description */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-white/80 mt-1 text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}