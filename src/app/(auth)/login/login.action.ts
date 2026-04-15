"use server"

import { cookies } from 'next/headers';
import { loginDataType } from './login.schema';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";

export async function loginReq(values: loginDataType) {
    const res = await fetch(`${API_BASE_URL}/v1/auth/signin`, {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const finalRes = await res.json()
    const myCookies = await cookies() 
    myCookies.set("token" , finalRes.token , {
        httpOnly : true , 
        maxAge : 60 * 60 * 24 , 
        secure : true , 
        sameSite : true
    })

    return res.ok
}