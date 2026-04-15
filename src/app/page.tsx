// app/page.tsx
import Slider from "@/components/slider/Slider";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import ProductCard from "@/components/Product/productCard/productCard";

// import apiServices from "@/services/api";
import image from "../assets/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png";
import { ICategory } from "@/interfaces/Icategory";
import { getMyToken } from "@/utiles/getMyToken";
import apiServices from "../../services/api";
import CategoryCard from "@/components/CategoriesSection/CategoriesCard";
import { Sparkles, ArrowRight, ShoppingBag, Tag, Flame } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const products = await apiServices.getAllProducts();
  getMyToken();

  const categories: ICategory[] = await apiServices.getAllCategories();

  return (
    <>
      {/* Hero Slider */}
      <Slider images={[image.src, image.src, image.src]} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Categories Section - Modern Redesign */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Animation */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 lg:mb-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                  Shop By <span className="bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Category</span>
                </h2>
                <p className="text-slate-500 mt-2 text-sm lg:text-base">Discover our curated collections</p>
              </div>
            </div>

            <Link 
              href="/categories" 
              className="group inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-0 text-emerald-600 hover:text-white font-medium rounded-xl border border-emerald-200 hover:bg-emerald-600 transition-all duration-300"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Categories Grid with Enhanced Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {categories.map((category, _index) => (
              <div key={category._id} className="transform hover:scale-105 transition-transform duration-300">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Products Section - Modern Redesign */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <Flame className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600">Hot Picks</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured <span className="bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm lg:text-base">
              Discover our handpicked selection of premium products just for you
            </p>
          </div>

          {/* Products Grid with Enhanced Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product: any, _index: number) => (
              <div key={product._id} className="transform hover:-translate-y-2 transition-all duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

        </div>
      </section>


    </>
  );
}