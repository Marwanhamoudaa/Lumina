'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cartContext } from '@/context/CartContextProvider';
import { removeFromWishList, setWishList } from '@/app/wishlist/wishListActions';
import { useContext } from 'react';
import { addToCart } from '@/app/shop/cartAction';
import { 
  Heart, 
  Truck, 
  RefreshCw, 
  Shield, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag,
  Zap,
  CheckCircle,
  Loader2,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageCover: string;
    images: string[];
    quantity: number;
    sold: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    brand: { name: string };
    category: { name: string };
}

export default function ProductDetails({ product }: { product: Product }) {
    const { wishlistData, setWishlistData, setnumberOfWishList, setnumberOfCartItem, setCartProducts, settotalPrice, setcartId } = useContext(cartContext) as any;



    const [selectedImage, setSelectedImage] = useState(product.imageCover);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const allImages = [product.imageCover, ...product.images];
    const discountedPrice = Math.round(product.price * 0.8);
    const originalPrice = Math.round(product.price * 1.25);
    async function handleAddToCart() {
        if (isAddingToCart) return;
        setIsAddingToCart(true);

        try {
            const res = await addToCart(product._id);
            if (res?.status === "success") {
                setnumberOfCartItem(res.numOfCartItems);
                setCartProducts(res.data.products);
                settotalPrice(res.data.totalCartPrice);
                setcartId(res.cartId);
                setIsAddedToCart(true);
                setTimeout(() => setIsAddedToCart(false), 1600);
            }
        } finally {
            setIsAddingToCart(false);
        }
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
        setSelectedImage(allImages[(currentImageIndex + 1) % allImages.length]);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
        setSelectedImage(allImages[(currentImageIndex - 1 + allImages.length) % allImages.length]);
    };

    useEffect(() => {
        if (wishlistData) {
            const exists = wishlistData.some((item: Product) => item._id === product._id);
            setIsWishlisted(exists);
        }
    }, [wishlistData, product._id]);

    async function handleToggleWishlist() {
        if (isWishlistLoading) return;

        const wasWishlisted = isWishlisted;
        setIsWishlistLoading(true);
        setIsWishlisted(!wasWishlisted);

        try {
            if (wasWishlisted) {
                await removeFromWishList(product._id);
                setWishlistData((prev: Product[]) => prev.filter((item) => item._id !== product._id));
                setnumberOfWishList((prev: number) => Math.max(0, prev - 1));
            } else {
                await setWishList(product._id);
                setWishlistData((prev: Product[]) => {
                    if (prev.some((item) => item._id === product._id)) return prev;
                    return [...prev, product];
                });
                setnumberOfWishList((prev: number) => prev + 1);
            }
        } catch (error) {
            setIsWishlisted(wasWishlisted);
            console.log("Error toggling wishlist", error);
        } finally {
            setIsWishlistLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    
                    {/* ==================== Image Gallery ==================== */}
                    <div className="space-y-5">
                        {/* Main Image with Carousel */}
                        <div className="relative group">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="aspect-square bg-linear-to-br from-slate-100 to-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-white/50"
                            >
                                <Image
                                    src={selectedImage}
                                    alt={product.title}
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-contain p-8 transition-all duration-700 hover:scale-105"
                                    priority
                                />
                            </motion.div>

                            {/* Navigation Arrows */}
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-slate-700" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                                    >
                                        <ChevronRight className="w-5 h-5 text-slate-700" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-5 gap-3">
                            {allImages.slice(0, 5).map((img, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setCurrentImageIndex(index);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300
                                        ${selectedImage === img 
                                            ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-200' 
                                            : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.title} view ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* ==================== Product Info ==================== */}
                    <div className="flex flex-col space-y-6">
                        {/* Brand & Category with Badges */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <motion.span 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold"
                                >
                                    {product.brand.name}
                                </motion.span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-slate-500 font-medium">{product.category.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleToggleWishlist}
                                    disabled={isWishlistLoading}
                                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                                >
                                    <Share2 className="w-5 h-5 text-slate-600" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Title */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight"
                        >
                            {product.title}
                        </motion.h1>

                        {/* Rating with Animation */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(product.ratingsAverage)
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'fill-gray-200 text-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-slate-600 font-medium">
                                {product.ratingsAverage} • {product.ratingsQuantity.toLocaleString()} reviews
                            </span>
                            <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-medium">Verified</span>
                            </div>
                        </motion.div>

                        {/* Price Section with Animation */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-baseline gap-4"
                        >
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-slate-900">
                                    ${discountedPrice}
                                </span>
                                <span className="text-xl text-gray-400 line-through">
                                    ${originalPrice}
                                </span>
                            </div>
                            <div className="px-2 py-1 bg-emerald-100 rounded-lg">
                                <span className="text-emerald-700 font-semibold text-sm">-20%</span>
                            </div>
                        </motion.div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${product.quantity > 10 ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
                            <span className="text-sm text-slate-600">
                                {product.quantity > 10 
                                    ? `In Stock • ${product.quantity} units available`
                                    : `Only ${product.quantity} left in stock - Order soon!`}
                            </span>
                        </div>

                        {/* Description */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-3"
                        >
                            <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
                                <span>Product Details</span>
                                <div className="h-px flex-1 bg-linear-to-r from-gray-200 to-transparent" />
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {product.description.replace(/\\t/g, ' ')}
                            </p>
                        </motion.div>

                        {/* Quantity Selector */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            <label className="block text-sm font-semibold text-slate-700">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-5 py-3 hover:bg-slate-50 transition-all rounded-l-2xl group"
                                    >
                                        <Minus className="w-4 h-4 text-slate-600 group-hover:scale-90 transition-transform" />
                                    </button>
                                    <span className="px-8 py-3 font-semibold text-slate-800 min-w-20 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                        className="px-5 py-3 hover:bg-slate-50 transition-all rounded-r-2xl group"
                                    >
                                        <Plus className="w-4 h-4 text-slate-600 group-hover:scale-90 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <motion.button
                                whileHover={{ scale: isAddingToCart ? 1 : 1.02 }}
                                whileTap={{ scale: isAddingToCart ? 1 : 0.98 }}
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className={`flex-1 font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 text-base shadow-lg
                                    ${isAddedToCart 
                                        ? 'bg-green-500 hover:bg-green-600' 
                                        : 'bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
                                    } text-white disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {isAddingToCart ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding...
                                    </>
                                ) : isAddedToCart ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-linear-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg"
                            >
                                <Zap className="w-5 h-5" />
                                Buy Now
                            </motion.button>
                        </motion.div>

                        {/* Trust Badges with Animation */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6"
                        >
                            {[
                                { icon: Truck, label: "Free Shipping", desc: "On orders $50+" },
                                { icon: RefreshCw, label: "30 Days Return", desc: "Easy returns policy" },
                                { icon: Shield, label: "Secure Payment", desc: "100% secure" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                    className="flex flex-col items-center gap-2 group cursor-pointer"
                                >
                                    <div className="p-3 bg-slate-100 rounded-full group-hover:bg-indigo-100 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                                    <span className="text-xs text-slate-500">{item.desc}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}