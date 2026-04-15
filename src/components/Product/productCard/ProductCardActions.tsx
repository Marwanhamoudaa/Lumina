"use client";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import Link from "next/link";
import { setWishList } from "@/app/wishlist/wishListActions";
import { cartContext } from "@/context/CartContextProvider";

export default function ProductCardActions({ productId }: { productId: string }) {

    const { wishlistData, setnumberOfWishList } = useContext(cartContext) as any;

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (wishlistData) {
            const exists = wishlistData.some((product: any) => product._id === productId);
            setIsWishlisted(exists);
        }
    }, [wishlistData, productId]);

    async function handleToggleWishlist() {
        if (isLoading) return;

        setIsLoading(true);

        const wasWishlisted = isWishlisted;
        setIsWishlisted(!wasWishlisted);

        if (wasWishlisted) {
            setnumberOfWishList((prev: number) => prev - 1);
        } else {
            setnumberOfWishList((prev: number) => prev + 1);
        }

        try {
            await setWishList(productId);
        } catch (error) {
            setIsWishlisted(wasWishlisted);
            if (wasWishlisted) {
                setnumberOfWishList((prev: number) => prev + 1);
            } else {
                setnumberOfWishList((prev: number) => prev - 1);
            }
            console.log("Error toggling wishlist", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-6 group-hover:translate-x-0 transition-all duration-300">

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                disabled={isLoading}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg transition-all ${isWishlisted
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/90 backdrop-blur-sm hover:bg-rose-50 hover:text-rose-500 text-slate-600'
                    }`}
            >
                <Heart
                    size={17}
                    className={isWishlisted ? 'fill-current' : ''}
                />
            </motion.button>

            <Link
                href={`/products/${productId}`}
                className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
            >
                <Eye size={17} />
            </Link>
        </div>
    );
}