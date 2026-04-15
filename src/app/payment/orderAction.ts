"use server"
import { shippingAddressType } from "@/interfaces/Ipayment";
import { getMyToken } from "@/utiles/getMyToken";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";
const APP_BASE_URL = process.env.APP_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function creatCashOrder(cartId:string , shippingAddress : shippingAddressType) {
    const token = await getMyToken()

    const res = await fetch(`${API_BASE_URL}/v2/orders/${cartId}` , {
        headers : {
            token : token as string , 
            "Content-Type" : "application/json"
        }, 
        method : "POST" , 
        body : JSON.stringify(shippingAddress)

    })
    const finalRes = await res.json()
    return finalRes
}
export async function creatVisaOrder(cartId:string , shippingAddress : shippingAddressType) {
    const token = await getMyToken()

    const res = await fetch(`${API_BASE_URL}/v1/orders/checkout-session/${cartId}?url=${APP_BASE_URL}` , {
        headers : {
            token : token as string , 
            "Content-Type" : "application/json"
        }, 
        method : "POST" , 
        body : JSON.stringify(shippingAddress)

    })
    const finalRes = await res.json()
    return finalRes
}