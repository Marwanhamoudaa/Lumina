"use server"

import { PaymentDataType } from "./Payment.schema"


export async function PaymentReq(values: PaymentDataType) {
    const res = await fetch(`${process.env.API_BASE_URL}/v1/auth/Payment`, {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.ok
} 