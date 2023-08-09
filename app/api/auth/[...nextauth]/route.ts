import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user?.email as string,
        },
      });
      session.user.id = sessionUser?.id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        // check if user already exists
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        // if not, create a new user and save to DB
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name.trim().toLowerCase(),
              image: profile.picture,
            },
          });
        }
        return true;
      } catch (error) {
        console.log("🚀 ~ file: route.js:34 ~ signIn ~ error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
