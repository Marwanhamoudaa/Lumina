"use server"

import { cookies } from 'next/headers';
import { loginDataType } from './login.schema';

export async function loginReq(values: loginDataType) {
    const res = await fetch(`${process.env.API_BASE_URL}/v1/auth/signin`, {
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