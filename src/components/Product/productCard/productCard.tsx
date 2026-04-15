import Link from "next/link";
import Image from "next/image";
import ProductCardActions from "./ProductCardActions";   
import AddToCartBtn from "./AddToCartBtn";
import { IProduct } from "@/interfaces/IProduct";



export default function ProductCard({ product }: { product: IProduct }) {
  const discount = product.priceAfterDiscount
    ? Math.round(((product.priceAfterDiscount - product.price) / product.priceAfterDiscount) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 hover:border-slate-200 h-full flex flex-col transition-all duration-300">
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-slate-50">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.priceAfterDiscount && (
            <div className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-2xl shadow">
              -{discount}% OFF
            </div>
          )}

          {product.ratingsAverage && product.ratingsAverage >= 4.5 && (
            <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-2xl shadow flex items-center gap-1">
              Best Seller
            </div>
          )}
        </div>

        {/* Actions - سيتم تمريره كـ Client Component */}
        <ProductCardActions productId={product._id} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {product.category?.name || "Category"}
          </p>
          {product.quantity > 0 ? (
            <span className="text-xs text-green-600">In Stock</span>
          ) : (
            <span className="text-xs text-red-600">Out of Stock</span>
          )}
        </div>

        <Link href={`/products/${product._id}`} className="block">
          <h3 className="text-base font-semibold text-slate-800 line-clamp-2 min-h-[48px] hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < Math.floor(product.ratingsAverage || 0) ? 'text-amber-400' : 'text-slate-200'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-slate-600">
            {product.ratingsAverage?.toFixed(1) || "4.8"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-6 flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-900">{product.price}</span>
            <span className="text-slate-400 text-sm ml-1">EGP</span>
            {product.priceAfterDiscount && (
              <p className="text-xs text-slate-400 line-through">
                {product.priceAfterDiscount} EGP
              </p>
            )}
          </div>

          <div className="w-32">
            <AddToCartBtn id={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
}