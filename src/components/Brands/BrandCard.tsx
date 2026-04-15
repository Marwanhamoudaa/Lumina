// components/BrandCard.tsx - Premium Server Component
import Image from 'next/image';
import Link from 'next/link';

// This is a server component - no hooks or client-side logic
export default function BrandCard({ brand }: any) {
  // Generate a deterministic "featured" status based on brand ID (no random)
  const isFeatured = brand._id.charCodeAt(brand._id.length - 1) % 5 === 0;
  const productCount = 20 + (brand._id.charCodeAt(0) % 30); // Deterministic product count

  return (
    <div className="transform transition-all duration-300 hover:-translate-y-2">
      <Link 
        href={`/brands/${brand._id}`} 
        className="group relative block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-200"
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-linear-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 group-hover:scale-110">
            <Image
              src={brand.image}
              alt={brand.name}
              width={180}
              height={180}
              className="w-full h-full object-contain"
              priority={false}
            />
          </div>
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-linear-to-t from-indigo-600/0 via-transparent to-transparent group-hover:from-indigo-600/30 transition-all duration-300" />
          
          {/* Stats Overlay on Hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="text-xs font-medium">{productCount}+ products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 text-center relative z-10 bg-white">
          <h3 className="font-bold text-slate-800 text-sm lg:text-base transition-colors duration-300 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text truncate px-2">
            {brand.name}
          </h3>
          
          {/* Product Count Indicator */}
          <div className="flex items-center justify-center gap-1 mt-1.5">
            <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
            <span className="text-xs text-slate-400">{productCount} items</span>
          </div>

          {/* Shop Link */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
              <span>Shop Collection</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Bottom Accent Border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Link>
    </div>
  );
}