import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const jwt = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: process.env.NODE_ENV === 'production' 
            ? '__Secure-next-auth.session-token' 
            : 'next-auth.session-token',
    });
    console.log(jwt , req);
    
    if (jwt == null) {
        
        return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher: ["/payment"]
}