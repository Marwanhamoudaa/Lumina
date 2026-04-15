import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: "fresh cart",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetch(`${API_BASE_URL}/v1/auth/signin`, {
                    body: JSON.stringify(credentials),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const finalRes = await res.json()
                if (finalRes.message == "success") {

                    return {
                        id: finalRes.user._id,
                        name: finalRes.user.name,
                        email: finalRes.user.email,
                        realTokenFromBackend: finalRes.token

                    };
                }
                return null
            }
        })
    ],

    callbacks: {

        jwt(params) {
            if (params.user) {
                (params.token as any).realTokenFromBackend = (params.user as any).realTokenFromBackend
            }
            return params.token
        },
        session({ session, token }) {
            (session.user as any).realTokenFromBackend = (token as any).realTokenFromBackend;
            return session;
        }

    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
};