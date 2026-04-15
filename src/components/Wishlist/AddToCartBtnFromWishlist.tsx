// components/Wishlist/AddToCartBtnFromWishlist.tsx
'use client';
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cartContext } from "@/context/CartContextProvider";
import { addToCart } from "@/app/shop/cartAction";

interface AddToCartBtnFromWishlistProps {
  id: string;
  onSuccess?: () => void; // Optional callback after successful add
}

export default function AddToCartBtnFromWishlist({ id, onSuccess }: AddToCartBtnFromWishlistProps) {
  const { setnumberOfCartItem, setCartProducts, settotalPrice } = useContext(cartContext) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAddToCart() {
    setIsLoading(true);
    const res = await addToCart(id);

    if (res.status === "success") {
      toast.success("Product added to cart successfully", {
        position: "top-center",
        duration: 2000,
      });
      setnumberOfCartItem(res.numOfCartItems);
      setCartProducts(res.data.products);
      settotalPrice(res.data.totalCartPrice);

      setAdded(true);
      
      // Execute callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => setAdded(false), 1600);
    } else {
      toast.error(res.message || "Failed to add product", {
        position: "top-center",
      });
    }
    setIsLoading(false);
  }

  return (
    <motion.button
      whileHover={{ scale: isLoading || added ? 1 : 1.02 }}
      whileTap={{ scale: isLoading || added ? 1 : 0.98 }}
      onClick={handleAddToCart}
      disabled={isLoading || added}
      className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden group
        ${added
          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
        } disabled:opacity-90 disabled:cursor-not-allowed min-w-[110px]`}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Adding...</span>
          </motion.div>
        ) : added ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Added!</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple Effect */}
      {!isLoading && !added && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}