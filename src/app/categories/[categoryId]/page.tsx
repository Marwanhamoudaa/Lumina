import React from 'react'
import { getCategoryProducts, getSpecificCategory } from '../categoryActions'
import ProductCard from '@/components/Product/productCard/productCard'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Package,
  Sparkles,
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  ShoppingBag
} from 'lucide-react'
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const category = await getSpecificCategory(categoryId)
  if (!category?.data?._id) {
    notFound();
  }
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.data.name, href: `/categories/${categoryId}` },
  ];
  const products = await getCategoryProducts(category.data._id)

  return (
    <>
      {/* Hero Section - Modern Premium Design */}
      <div className="relative h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src={category.data.image}
            alt={category.data.name}
            fill
            className="object-cover brightness-50"
            priority
          />
          {/* Gradient Overlay - Modern & Premium */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 text-white text-sm border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-medium">Category</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
              {category.data.name}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-200 max-w-md mb-6">
              Browse our curated collection of {category.data.name.toLowerCase()} products
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Package className="w-4 h-4" />
                <span>{products.length} Products</span>
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Now</span>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70">
              {breadcrumb.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="w-3 h-3 text-white/40" />}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white font-semibold">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

       
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                All Products
              </h2>
            </div>
            <p className="text-slate-500 text-sm">
              Showing <span className="font-semibold text-indigo-600">{products.length}</span> products in {category.data.name}
            </p>
          </div>

          {/* Filter and View Options - Visual Only */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
              <button className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid - Enhanced */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product: any, index: number) => (
                <div
                  key={product._id}
                  className="transform transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* View More Button - Visual Only */}
            <div className="text-center mt-12 lg:mt-16">
              <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300">
                <ShoppingBag className="w-4 h-4" />
                <span>Load More Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </>
        ) : (
          // Empty State - Enhanced
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Products Found</h3>
            <p className="text-slate-500 mb-6">No products available in this category yet.</p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              <span>Browse Other Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}