// components/Wishlist/RemoveFromWishlistBtn.tsx
'use client';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RemoveFromWishlistBtnProps {
  productId: string;
  onRemove: (productId: string) => Promise<void>;
}

export default function RemoveFromWishlistBtn({ productId, onRemove }: RemoveFromWishlistBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleRemove() {
    setIsLoading(true);
    try {
      await onRemove(productId);
      router.refresh();
      toast.success("Product removed from wishlist", {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to remove product", {
        position: "top-center",
      });
    }
    setIsLoading(false);
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleRemove}
      disabled={isLoading}
      className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Remove from wishlist"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </motion.button>
  );
}