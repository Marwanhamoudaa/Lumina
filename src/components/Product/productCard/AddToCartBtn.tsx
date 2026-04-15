"use client";
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cartContext } from "@/context/CartContextProvider";
import { addToCart } from "@/app/shop/cartAction";

export default function AddToCartBtn({ id }: { id: string }) {
  const { setnumberOfCartItem, setCartProducts, settotalPrice } = useContext(cartContext) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAddToCart() {
    setIsLoading(true);
    const res = await addToCart(id);

    if (res.status === "success") {
      toast.success("product added succcessfully", {
        position: "top-center",
        duration: 2000,
      });
      setnumberOfCartItem(res.numOfCartItems);
      setCartProducts(res.data.products);
      settotalPrice(res.data.totalCartPrice);

      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    } else {
      toast.error(res.message || "Error", {
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
      className={`relative w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden
        ${added
          ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
          : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
        } disabled:opacity-90 disabled:cursor-not-allowed`}
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
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
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
