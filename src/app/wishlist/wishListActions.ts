"use server"
import { CartResponse } from "@/interfaces/cart.type"
import { WishlistResponse } from "@/interfaces/Wishlist"
import { getMyToken } from "@/utiles/getMyToken"
import { revalidatePath } from "next/cache"

export async function getUserWishList(): Promise<WishlistResponse> {
    const myToken = await getMyToken()
    const res = await fetch(`${process.env.API_BASE_URL}/v1/wishlist`,
        {
            headers: {
                token: myToken as string
            }
        }
    )
    const finalRes = await res.json()
    return finalRes
}

interface WishData {
    productId: string;
}

export async function setWishList(productId: string) {
    const data: WishData = {
        productId
    };

    const myToken = await getMyToken();

    const req = await fetch(`${process.env.API_BASE_URL}/v1/wishlist`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            token: myToken as string
        },
        body: JSON.stringify(data)
    });

    const res = await req.json();
    return res;
}

export async function removeFromWishList(productId: string) {
    const myToken = await getMyToken();

    const req = await fetch(`${process.env.API_BASE_URL}/v1/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            token: myToken as string
        }
    });

    const res = await req.json();
    revalidatePath("/wishlist");
    return res;
}
