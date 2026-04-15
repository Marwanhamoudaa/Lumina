"use server"

import { signupDataType } from "./signup.schema"

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";


export async function signupReq(values: signupDataType) {
    const res = await fetch(`${API_BASE_URL}/v1/auth/signup`, {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.ok
} 