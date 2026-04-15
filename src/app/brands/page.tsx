// app/brands/page.tsx
import React from 'react';
import { getAllBrands } from './brandsAction';
import { BrandsResponse } from '@/interfaces/IBrand';
import BrandCard from '@/components/Brands/BrandCard';
import { FaTags } from 'react-icons/fa';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import { Sparkles, TrendingUp, Award, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default async function BrandsPage() {
  const brandsData: BrandsResponse = await getAllBrands();
  
  // Get featured brands (first 3 for stats)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Header Section - Enhanced */}
      <PageHeader
        title="Top Brands"
        description="Shop from your favorite brands with confidence"
        icon={<FaTags className="text-3xl" />}
        gradient="from-indigo-600 via-purple-600 to-pink-500"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Brands" }
        ]}
      />

      {/* Stats Section - New Addition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{brandsData.data.length}</p>
                <p className="text-sm text-slate-500">Total Brands</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1000+</p>
                <p className="text-sm text-slate-500">Products Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-sm text-slate-500">Authentic Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid - Modern Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header with Animation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-1 bg-linear-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                All Brands
              </h2>
            </div>
            <p className="text-slate-500">
              Discover {brandsData.data.length} premium brands and shop with confidence
            </p>
          </div>
          

        </div>

        {/* Brands Grid - Enhanced */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
          {brandsData.data.map((brand, index) => (
            <div 
              key={brand._id} 
              className="transform hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>

        {/* Empty State - If no brands */}
        {brandsData.data.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <FaTags className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Brands Found</h3>
            <p className="text-slate-500">Check back later for new brands</p>
          </div>
        )}
      </div>



    </div>
  );
}