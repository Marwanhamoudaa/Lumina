import { getUserWishList, removeFromWishList } from './wishListActions';
import { IProduct } from '@/interfaces/IProduct';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import WishlistHeader from '@/components/Wishlist/WishlistHeader ';
import WishlistEmpty from '@/components/Wishlist/WishlistEmpty';
import WishlistCard from '@/components/Wishlist/WishlistCard';
import AddAllToCartBtn from '@/components/Wishlist/AddAllToCartBtn';

export default async function WishlistPage() {
  const { data }: { data: IProduct[] } = await getUserWishList();
  const wishlistCount = data?.length || 0;

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-white/20">
            <Heart className="w-4 h-4 text-rose-300" />
            <span className="text-sm font-semibold tracking-wide">My Wishlist</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            Saved Items
          </h1>
          
          <p className="text-base md:text-lg text-white/80 max-w-md mx-auto">
            Products you've saved for later
          </p>
          
          {wishlistCount > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm text-white/90">{wishlistCount} items in wishlist</span>
            </div>
          )}
        </div>
        
      </div>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {wishlistCount > 0 ? (
          <>
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-1 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Your Wishlist
                  </h2>
                </div>
                <p className="text-slate-500 text-sm">
                  You have <span className="font-semibold text-rose-600">{wishlistCount}</span> saved items
                </p>
              </div>
              
              <AddAllToCartBtn products={data} />
            </div>

            {/* Wishlist Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <WishlistHeader />
              <div className="divide-y divide-slate-100">
                {data.map((product: IProduct) => (
                  <WishlistCard 
                    key={product._id} 
                    product={product}
                    onRemoveFromWishlist={removeFromWishList}
                    isInCart={false}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 flex items-center justify-between">
              <Link 
                href="/shop" 
                className="group inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>Continue Shopping</span>
              </Link>
              
              <p className="text-xs text-slate-400">
                Don't lose your favorites!
              </p>
            </div>
          </>
        ) : (
          <WishlistEmpty />
        )}
      </div>

     
    </>
  );
}