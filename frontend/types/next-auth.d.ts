import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
interface AuthUser {
  id: string;
  role: string;
  accessToken?: string;
  email: string;
  username: string;
}

declare module 'next-auth' {
  interface Session {
    user: AuthUser & DefaultSession['user'];
    accessToken: string; // THE FUCK ?
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: AuthUser;
  }
}
