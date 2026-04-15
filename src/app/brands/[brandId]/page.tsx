import React from 'react'
import { getBrandProducts, getSpecificBrand } from '../brandsAction'
import ProductCard from '@/components/Product/productCard/productCard'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ brandId: string }> }) {

  const { brandId } = await params
  const brandData = await getSpecificBrand(brandId)
  if (!brandData?.data?._id) {
    notFound();
  }
  const products = await getBrandProducts(brandId)

  return (
    <>
      <div className="relative h-105 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={brandData.data.image}
            alt={brandData.data.name}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 text-white text-sm">
              brandData
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              {brandData.data.name}
            </h1>

            <p className="text-xl text-zinc-200 max-w-md">
              Browse our collection of {brandData.data.name.toLowerCase()} products
            </p>

            {/* Breadcrumb */}
            {/* <nav className="flex items-center gap-2 mt-8 text-sm text-zinc-300">
              {breadcrumb.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-zinc-500">›</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav> */}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-semibold text-zinc-900">
              All Products
            </h2>
            <p className="text-zinc-500 mt-1">
              Showing {products.length} products in {brandData.data.name}
            </p>
          </div>


        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No products found in this brandData</p>
          </div>
        )}
      </div>
    </>
  );
}
