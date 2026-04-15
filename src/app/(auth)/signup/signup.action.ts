"use server"

import { signupDataType } from "./signup.schema"


export async function signupReq(values: signupDataType) {
    const res = await fetch(`${process.env.API_BASE_URL}/v1/auth/signup`, {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.ok
} 