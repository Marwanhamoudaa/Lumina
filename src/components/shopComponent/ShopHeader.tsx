import React from 'react';
import { FaBoxOpen } from 'react-icons/fa6';
export default function AllProductsHeader() {
  return (
    <div className="bg-linear-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">All Products</span>
        </nav>

        {/* Main Content */}
        <div className="flex items-center gap-5">
          
          {/* Icon Box */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <FaBoxOpen size={42} className="text-white" />
          </div>

          {/* Text Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              All Products
            </h1>
            <p className="text-white/80 mt-1 text-lg">
              Explore our complete product collection
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}