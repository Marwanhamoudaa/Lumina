"use server"
import { CartResponse } from "@/interfaces/cart.type";
import { getMyToken } from "@/utiles/getMyToken";
import { headers } from "next/headers";
export async function addToCart(id: string): Promise<CartResponse> {
    console.log("helllllooooo");
    const myToken = await getMyToken()
    const res = await fetch(`${process.env.API_BASE_URL}/v2/cart`, {
        method: "POST",
        body: JSON.stringify({

            productId: id

        },
        ),
        headers: {
            "Content-Type": "application/json",
            token: myToken as string
        }
    })
    const finalRes = await res.json()
    return finalRes

}

export async function getUserCart(): Promise<CartResponse> {
    const myToken = await getMyToken()
    const res = await fetch(`${process.env.API_BASE_URL}/v2/cart`,
        {
            headers: {
                token: myToken as string
            }
        }
    )

    const finalRes = res.json()
    return finalRes
}


export async function deleteItemFromCart(productId: string): Promise<CartResponse> {
    const myToken = await getMyToken()
    const res = await fetch(`${process.env.API_BASE_URL}/v2/cart/${productId}`,
        {
            method: "DELETE",
            headers: {
                token: myToken as string
            }
        }
    )

    const finalRes = res.json()
    return finalRes
}



export async function updateProductCard(id: string , count : number): Promise<CartResponse> {
    const myToken = await getMyToken()
    const res = await fetch(`${process.env.API_BASE_URL}/v2/cart/${id}`, {
        method: "PUT",
        body: JSON.stringify({count}),
        headers: {
            "Content-Type": "application/json",
            token: myToken as string
        }
    })
    const finalRes = await res.json()
    return finalRes

}
export async function deleteUserCart(): Promise<CartResponse> {
    const myToken = await getMyToken()
    const res = await fetch(`${process.env.API_BASE_URL}/v2/cart`,
        {
            method: "DELETE",
            headers: {
                token: myToken as string
            }
        }
    )

    const finalRes = res.json()
    return finalRes
}
