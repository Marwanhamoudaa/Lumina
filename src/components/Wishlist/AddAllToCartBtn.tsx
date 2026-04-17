"use client";

import { useContext, useMemo, useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/shop/cartAction";
import { removeFromWishList } from "@/app/wishlist/wishListActions";
import { cartContext } from "@/context/CartContextProvider";
import { IProduct } from "@/interfaces/IProduct";

interface AddAllToCartBtnProps {
  products: IProduct[];
}

export default function AddAllToCartBtn({ products }: AddAllToCartBtnProps) {
  const { setnumberOfCartItem, setCartProducts, settotalPrice, refreshWishlist } = useContext(cartContext) as any;
  const [isAddingAll, setIsAddingAll] = useState(false);
  const router = useRouter();

  const productIds = useMemo(
    () => products.map((product) => product._id).filter(Boolean),
    [products]
  );

  async function handleAddAllToCart() {
    if (isAddingAll || productIds.length === 0) return;

    setIsAddingAll(true);
    let addedCount = 0;
    let failedCount = 0;
    let removedCount = 0;
    let lastSuccessResponse: any = null;

    for (const productId of productIds) {
      try {
        const res = await addToCart(productId);
        if (res?.status === "success") {
          addedCount += 1;
          lastSuccessResponse = res;
          try {
            await removeFromWishList(productId);
            removedCount += 1;
          } catch {
            // Continue processing other products even if one remove fails.
          }
        } else {
          failedCount += 1;
        }
      } catch {
        failedCount += 1;
      }
    }

    if (lastSuccessResponse?.status === "success") {
      setnumberOfCartItem(lastSuccessResponse.numOfCartItems);
      setCartProducts(lastSuccessResponse.data.products);
      settotalPrice(lastSuccessResponse.data.totalCartPrice);
    }

    if (addedCount > 0) {
      toast.success(
        `${addedCount} item${addedCount > 1 ? "s" : ""} added to cart successfully.`,
        { position: "top-center" }
      );
    }

    if (failedCount > 0) {
      toast.warning(
        `${failedCount} item${failedCount > 1 ? "s were" : " was"} skipped (already in cart or unavailable).`,
        { position: "top-center" }
      );
    }

    if (addedCount === 0 && failedCount === 0) {
      toast.info("No items to add.", { position: "top-center" });
    }

    if (removedCount > 0) {
      await refreshWishlist?.();
      router.refresh();
    }

    setIsAddingAll(false);
  }

  return (
    <button
      onClick={handleAddAllToCart}
      disabled={isAddingAll || productIds.length === 0}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isAddingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
      <span>{isAddingAll ? "Adding..." : "Add All to Cart"}</span>
    </button>
  );
}
