// components/Wishlist/WishlistEmpty.tsx
import Link from 'next/link';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';

export default function WishlistEmpty() {
  return (
    <div className="text-center py-16 md:py-20">
      <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
        <Heart className="w-10 h-10 text-rose-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Your wishlist is empty</h3>
      <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm">
        Save your favorite items here to shop them later or add to cart
      </p>
      <Link 
        href="/shop" 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Start Shopping</span>
        <Sparkles className="w-4 h-4" />
      </Link>
    </div>
  );
}