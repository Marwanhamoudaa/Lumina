"use client";
import { useContext, useState, useEffect } from 'react';
import { cartContext } from '@/context/CartContextProvider';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Modern Icons
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  Shield,
  Tag,
  ArrowLeft,
  CreditCard,
  Lock,
  Package,
  AlertCircle
} from 'lucide-react';

import { deleteItemFromCart, deleteUserCart, updateProductCard } from '../shop/cartAction';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CartPage() {
  const { numberOfCartItem, setcartId, totalPrice, cartProducts, setCartProducts, settotalPrice, setnumberOfCartItem } = useContext(cartContext) as any;
  const [isClearing, setIsClearing] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<{ [key: string]: boolean }>({});

  async function handleRemovedItem(id: string) {
    const res = await deleteItemFromCart(id);
    setCartProducts(res.data.products);
    settotalPrice(res.data.totalCartPrice);
    setnumberOfCartItem(res.numOfCartItems);
    setcartId(res.cartId);
    toast.success(res.message, { position: "top-center" });
  }

  async function handleUpdate(id: string, count: number) {
    if (count < 1 || updatingItems[id]) return;
    setUpdatingItems(prev => ({ ...prev, [id]: true }));
    const res = await updateProductCard(id, count);
    setCartProducts(res.data.products);
    settotalPrice(res.data.totalCartPrice);
    setnumberOfCartItem(res.numOfCartItems);
    setcartId(res.cartId);
    setTimeout(() => setUpdatingItems(prev => ({ ...prev, [id]: false })), 500);
  }

  async function handleClearCart() {
    setIsClearing(true);
    const res = await deleteUserCart();
    setCartProducts(res.data.products);
    settotalPrice(res.data.totalCartPrice);
    setnumberOfCartItem(res.numOfCartItems);
    setcartId(res.cartId);
    toast.success("Cart cleared successfully", { position: "top-center" });
    setTimeout(() => setIsClearing(false), 500);
  }

  const freeShippingThreshold = 500;
  const shippingCost = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 lg:mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-slate-500 mt-2">{numberOfCartItem} item{numberOfCartItem !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartProducts && cartProducts.length > 0 ? (
                cartProducts.map((item: any, index: number) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
                  >
                    <div className="p-5 lg:p-6">
                      <div className="flex gap-5 lg:gap-6">
                        {/* Product Image */}
                        <Link href={`/products/${item.product._id}`} className="relative shrink-0 group/image">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 p-4 border border-slate-200 overflow-hidden"
                          >
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={200}
                              height={200}
                              className="w-full h-full object-contain transition-transform duration-500 group-hover/image:scale-110"
                            />
                          </motion.div>
                          {/* Stock Badge */}
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg"
                          >
                            <Package className="w-3 h-3" />
                            In Stock
                          </motion.div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="mb-3">
                            <Link href={`/products/${item.product._id}`}>
                              <h3 className="font-bold text-slate-900 hover:text-indigo-600 transition-colors leading-relaxed text-base lg:text-lg line-clamp-2">
                                {item.product.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className="inline-block px-2.5 py-1 bg-linear-to-r from-indigo-50 to-emerald-50 text-indigo-700 text-xs font-medium rounded-full">
                                {item.product.category?.name || "Fashion"}
                              </span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500 font-mono">
                                SKU: {item.product._id.slice(-6).toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-indigo-600 font-bold text-xl">
                                {item.price} EGP
                              </span>
                              <span className="text-xs text-slate-400">per unit</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center">
                              <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
                                {(() => {
                                  const productId = item.product.id;
                                  const isUpdating = !!updatingItems[productId];

                                  return (
                                    <>
                                <motion.button 
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleUpdate(productId, item.count - 1)}
                                  disabled={isUpdating}
                                  className="h-9 w-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-600 disabled:hover:bg-white"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </motion.button>
                                <motion.span 
                                  key={item.count}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className="w-12 text-center font-bold text-slate-900"
                                >
                                  {item.count}
                                </motion.span>
                                <motion.button 
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleUpdate(productId, item.count + 1)}
                                  disabled={isUpdating}
                                  className="h-9 w-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-600 disabled:hover:bg-white"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </motion.button>
                                    </>
                                  );
                                })()}
                              </div>
                              {updatingItems[item.product.id] && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="ml-2"
                                >
                                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                </motion.div>
                              )}
                            </div>

                            {/* Total & Remove */}
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xs text-slate-400 mb-0.5">Total</p>
                                <motion.p 
                                  key={item.price * item.count}
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                  className="text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                                >
                                  {(item.price * item.count).toFixed(0)}
                                  <span className="text-sm font-medium text-slate-400"> EGP</span>
                                </motion.p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemovedItem(item.product.id)}
                                className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-white rounded-2xl border border-slate-100"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-lg">Your cart is empty</p>
                  <Link href="/" className="inline-block mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
                    Start Shopping →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            {cartProducts && cartProducts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between"
              >
                <Link href="/" className="group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearCart}
                  disabled={isClearing}
                  className="group flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {isClearing ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                  <span>Clear all items</span>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Order Summary - Right Side */}
          {cartProducts && cartProducts.length > 0 && (
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden sticky top-24 shadow-xl"
              >
                {/* Header */}
                <div className="bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Shipping Progress */}
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {amountToFreeShipping > 0 
                          ? `Add ${amountToFreeShipping} EGP for free shipping`
                          : "✨ You've earned free shipping!"}
                      </span>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${shippingProgress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-linear-to-r from-amber-400 to-orange-400 rounded-full"
                      />
                    </div>
                  </motion.div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <motion.span 
                        key={totalPrice}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="font-semibold text-slate-900"
                      >
                        {totalPrice} EGP
                      </motion.span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-slate-900">
                        {amountToFreeShipping <= 0 ? "Free" : `${shippingCost} EGP`}
                      </span>
                    </div>
                    <div className="border-t border-dashed border-slate-200 pt-4 mt-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-900 font-bold text-lg">Total</span>
                        <div className="text-right">
                          <motion.span 
                            key={amountToFreeShipping <= 0 ? totalPrice : totalPrice + shippingCost}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                          >
                            {(amountToFreeShipping <= 0 ? totalPrice : totalPrice + shippingCost).toFixed(0)}
                          </motion.span>
                          <span className="text-sm text-slate-500 ml-1">EGP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                  >
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Apply Promo Code</span>
                  </motion.button>

                  {/* Checkout Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/payment"
                      className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-bold hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Checkout</span>
                    </Link>
                  </motion.div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Lock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Truck className="w-3.5 h-3.5 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Shield className="w-3.5 h-3.5 text-indigo-500" />
                      <span>2 Year Warranty</span>
                    </div>
                  </div>

                  <Link href="/" className="block text-center text-indigo-600 hover:text-indigo-700 text-sm font-medium py-2 transition-colors">
                    ← Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}