import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID!;
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET!;
const KEYCLOAK_URL = process.env.KEYCLOAK_URL!;
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM!;

const KEYCLOAK_ISSUER = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`;
const keycloakConfig = {
  clientId: KEYCLOAK_CLIENT_ID,
  clientSecret: KEYCLOAK_CLIENT_SECRET,
  issuer: KEYCLOAK_ISSUER
} as const;

const authOptions: NextAuthOptions = {
  providers: [KeycloakProvider(keycloakConfig)],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      if (user?.id) {
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        // @ts-ignore
        session.access_token = token.access_token;

        // @ts-ignore
        session.user.id = token.user_id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
