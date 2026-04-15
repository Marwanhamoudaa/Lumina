import * as z from "zod"


export const  signupSchema = z.object({
    name: z.string("enter your nam"),
    email: z.email("enter valid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    phone: z.string("enter your phone")

}).refine(function(params){
    return params.password === params.rePassword
},{
    error : "password doesnt match" , 
    path : ['rePassword']
})

export type signupDataType = z.infer<typeof signupSchema>