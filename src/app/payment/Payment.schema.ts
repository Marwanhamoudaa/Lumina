import * as z from "zod"


export const  PaymentSchema = z.object({
    details: z.string("enter your name"),
    phone: z.string("enter your phone"),
    city: z.string("enter your name"),
    postalCode: z.string().min(1, "Postal code is required"),
    paymentMethod: z.enum(["cash", "online"]),

})

export type PaymentDataType = z.infer<typeof PaymentSchema>