// components/PageHeader/PageHeader.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  image?: string;           
  icon?: ReactNode;         
  gradient?: string;
}

export default function PageHeader({
  title,
  description = "Browse products in this category",
  breadcrumb,
  image,
  icon,
  gradient = "from-blue-600 via-blue-500 to-blue-400",
}: PageHeaderProps) {
  return (
    <div className={`bg-linear-to-br ${gradient} text-white`}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
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

        {/* Main Content */}
        <div className="flex items-center gap-5">
          {/* Image or Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0 overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={48}
                height={48}
                className="w-10 h-10 object-contain"
              />
            ) : icon ? (
              icon
            ) : null}
          </div>

          {/* Title and Description */}
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