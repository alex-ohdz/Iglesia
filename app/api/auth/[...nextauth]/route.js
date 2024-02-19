import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// Asumiendo que 'connectMongoDB' y 'User' ya no son necesarios para este enfoque simplificado

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (
        account.provider === "google" &&
        user.email === "alejandrooramash@gmail.com"
      ) {
        return true;
      }

      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
