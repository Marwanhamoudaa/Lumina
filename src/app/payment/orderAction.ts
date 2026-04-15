"use server"
import { shippingAddressType } from "@/interfaces/Ipayment";
import { getMyToken } from "@/utiles/getMyToken";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";
const APP_BASE_URL = process.env.APP_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function resolveLatestCartId(token: string, fallbackCartId: string) {
    const res = await fetch(`${API_BASE_URL}/v2/cart`, {
        headers: { token },
        cache: "no-store",
    });

    if (!res.ok) {
        return fallbackCartId;
    }

    const data = await res.json();
    return data?.cartId ?? data?.data?._id ?? fallbackCartId;
}

export async function creatCashOrder(cartId:string , shippingAddress : shippingAddressType) {
    const token = await getMyToken()
    if (typeof token !== "string" || !token) {
        return { status: "fail", message: "Unauthorized: please sign in again." };
    }

    const latestCartId = await resolveLatestCartId(token, cartId);
    if (!latestCartId) {
        return { status: "fail", message: "No active cart found for your account." };
    }

    const res = await fetch(`${API_BASE_URL}/v2/orders/${latestCartId}` , {
        headers : {
            token, 
            "Content-Type" : "application/json"
        }, 
        method : "POST" , 
        body : JSON.stringify(shippingAddress)

    })
    const finalRes = await res.json()
    if (!res.ok) {
        return { status: "fail", message: finalRes?.message || "Cash order request failed" };
    }
    return finalRes
}
export async function creatVisaOrder(cartId:string , shippingAddress : shippingAddressType) {
    const token = await getMyToken()
    if (typeof token !== "string" || !token) {
        return { status: "fail", message: "Unauthorized: please sign in again." };
    }

    const latestCartId = await resolveLatestCartId(token, cartId);
    if (!latestCartId) {
        return { status: "fail", message: "No active cart found for your account." };
    }

    const res = await fetch(`${API_BASE_URL}/v1/orders/checkout-session/${latestCartId}?url=${APP_BASE_URL}` , {
        headers : {
            token, 
            "Content-Type" : "application/json"
        }, 
        method : "POST" , 
        body : JSON.stringify(shippingAddress)

    })
    const finalRes = await res.json()
    if (!res.ok) {
        return { status: "fail", message: finalRes?.message || "Online payment session request failed" };
    }
    return finalRes
}