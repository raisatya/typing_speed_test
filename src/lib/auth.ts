import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
