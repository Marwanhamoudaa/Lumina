import { decode } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { nextAuthConfig } from '@/lib/nextauth.config';
export async function getMyToken() {
  const session = await getServerSession(nextAuthConfig);
  const sessionToken = (session?.user as { realTokenFromBackend?: string } | undefined)?.realTokenFromBackend;
  if (sessionToken) {
    return sessionToken;
  }

  const myCookies = await cookies();
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    return undefined;
  }

  const tokenFromCookies =
    myCookies.get('__Secure-next-auth.session-token')?.value ??
    myCookies.get('next-auth.session-token')?.value;

  if (!tokenFromCookies) {
    return undefined;
  }

  const myToken = await decode({ token: tokenFromCookies, secret });

  return myToken?.realTokenFromBackend;


}
