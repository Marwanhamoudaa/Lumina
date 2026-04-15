import React from 'react';
import AllProductsHeader from "../../components/shopComponent/ShopHeader";
import apiServices from '../../../services/api';
import ProductCard from '@/components/Product/productCard/productCard';

export default async function AllProductsPage() {

  const products = await apiServices.getAllProducts();

  return (
    <>
      <AllProductsHeader />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">



        {/* Products Grid*/}
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-semibold text-zinc-900 tracking-tight">
                All Products
              </h1>
              <p className="text-zinc-500 mt-2 text-lg">
                Discover our complete collection — {products.length} products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-24">
              <p className="text-zinc-500 text-lg">No products found at the moment</p>
            </div>
          )}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-medium text-zinc-900 mb-2">No products found</h3>
            <p className="text-zinc-500">We couldn't find any products at the moment.</p>
          </div>
        )}
      </div>
    </>
  );
}