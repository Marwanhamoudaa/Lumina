import { ICategory } from '@/interfaces/Icategory';
import apiServices from '../../../services/api';
import CategoryCard from '@/components/CategoriesSection/CategoriesCard';
import { FaBoxOpen } from 'react-icons/fa';
import { Sparkles, TrendingUp, ShoppingBag, Award } from 'lucide-react';

export default async function page() {
    const categories: ICategory[] = await apiServices.getAllCategories();

    // Get category statistics (deterministic based on category ID)
    const totalProducts = categories.length * 24; // Mock calculation
    const popularCategories = categories.slice(0, 3);

    return (
        <>
            {/* Hero Header - Modern & Premium */}
            <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                        <FaBoxOpen className="text-2xl text-indigo-400" />
                        <span className="text-sm font-semibold tracking-wide uppercase bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Shop by Category
                        </span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-linear-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                        All Categories
                    </h1>
                    
                    {/* Description */}
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                        Explore our complete product collection and discover what suits you best
                    </p>
                </div>
            </div>

            {/* Stats Section - New Addition */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FaBoxOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
                                <p className="text-sm text-slate-500">Total Categories</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{totalProducts}+</p>
                                <p className="text-sm text-slate-500">Products Available</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                {/* Header with Animation */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-8 w-1 bg-linear-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                            <h2 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Our Categories
                            </h2>
                        </div>
                        <p className="text-slate-500">
                            Browse by category • {categories.length} collections available
                        </p>
                    </div>
                    
                    {/* Popular Categories Tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-slate-500 mr-2">Popular:</span>
                        {popularCategories.map((cat) => (
                            <span key={cat._id} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                {cat.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Categories Grid - Enhanced */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {categories.map((category, index) => (
                        <div 
                            key={category._id} 
                            className="transform transition-all duration-300 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                            <FaBoxOpen className="text-4xl text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No Categories Found</h3>
                        <p className="text-slate-500">Check back later for new collections</p>
                    </div>
                )}
            </div>


        </>
    );
}