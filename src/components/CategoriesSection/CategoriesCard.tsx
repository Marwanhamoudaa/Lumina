// components/CategoryCard/CategoryCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ICategory } from '@/interfaces/Icategory';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: ICategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
    >
      {/* صورة التصنيف */}
      <div className="relative h-52 overflow-hidden bg-zinc-50">
        <Image
          src={category.image || '/placeholder-category.jpg'}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Overlay خفيف عند الـ hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* محتوى الكارد */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-semibold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1">
            {category.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <span>{category.productCount || 0}</span>
            <span className="text-gray-400">Products</span>
          </div>

          <div className="flex items-center gap-1 text-gray-400 group-hover:text-indigo-600 transition-colors">
            Shop Now
            <ArrowRight 
              size={18} 
              className="group-hover:translate-x-1 transition-transform duration-300" 
            />
          </div>
        </div>
      </div>
    </Link>
  );
}