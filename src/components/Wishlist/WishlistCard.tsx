// components/Wishlist/WishlistCard.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/interfaces/IProduct';
import { CheckCircle, Package, Star, AlertCircle } from 'lucide-react';
import AddToCartBtnFromWishlist from './AddToCartBtnFromWishlist';
import RemoveFromWishlistBtn from './RemoveFromWishlistBtn';
import { useState } from 'react';

interface WishlistCardProps {
  product: IProduct;
  onRemoveFromWishlist: (productId: string) => Promise<void>;
  isInCart?: boolean;
}
export default function WishlistCard({ product, onRemoveFromWishlist, isInCart = false }: WishlistCardProps) {
  const [isInCartState, setIsInCartState] = useState(isInCart);
  const discount = product.priceAfterDiscount 
    ? Math.round(((product.priceAfterDiscount - product.price) / product.priceAfterDiscount) * 100)
    : 0;

  const handleAddToCartSuccess = () => {
    setIsInCartState(true);
  };

  const handleRemoveFromWishlist = async () => {
    await onRemoveFromWishlist(product._id);
  };

  return (
    <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent transition-all duration-300 border-b border-slate-100 last:border-0">
  
      {/* Product Column */}
      <div className="md:col-span-6 flex items-center gap-4">
        {/* Product Image */}
        <Link 
          href={`/products/${product._id}`} 
          className="relative w-20 h-20 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 overflow-hidden shrink-0 group-hover:shadow-md transition-all duration-300"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
          />
          {discount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[9px] font-bold text-white">-{discount}%</span>
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="min-w-0 flex-1">
          <Link 
            href={`/products/${product._id}`} 
            className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-2 text-sm md:text-base"
          >
            {product.title}
          </Link>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
              {product.category?.name || "Uncategorized"}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400">
              {product.brand?.name || "Generic Brand"}
            </span>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={`${
                    i < Math.floor(product.ratingsAverage || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400">
              ({product.ratingsQuantity || 0})
            </span>
          </div>
        </div>
      </div>

      {/* Price Column */}
      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
        <span className="md:hidden text-xs text-slate-400 min-w-[45px]">Price:</span>
        <div className="text-right md:text-center">
          <div className="font-bold text-slate-800 text-base">
            {product.price} EGP
          </div>
          {product.priceAfterDiscount && (
            <div className="text-xs text-slate-400 line-through">
              {product.priceAfterDiscount} EGP
            </div>
          )}
        </div>
      </div>

      {/* Status Column */}
      <div className="md:col-span-2 flex md:justify-center">
        <span className="md:hidden text-xs text-slate-400 mr-2 min-w-[45px]">Status:</span>
        {isInCartState ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
            <CheckCircle className="w-3 h-3" />
            <span>In Cart</span>
          </span>
        ) : product.quantity > 0 ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            <Package className="w-3 h-3" />
            <span>In Stock</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
            <AlertCircle className="w-3 h-3" />
            <span>Out of Stock</span>
          </span>
        )}
      </div>

      {/* Actions Column */}
      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
        {isInCartState ? (
          <Link
            href="/cart"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all group min-w-[110px]"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">View Cart</span>
            <span className="sm:hidden">Cart</span>
          </Link>
        ) : (
          <AddToCartBtnFromWishlist 
            id={product._id} 
            onSuccess={handleAddToCartSuccess}
          />
        )}
        
        <RemoveFromWishlistBtn 
          productId={product._id}
          onRemove={handleRemoveFromWishlist}
        />
      </div>
    </div>
  );
}