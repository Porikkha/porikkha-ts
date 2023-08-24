import NextAuth, { DefaultSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/utils/database';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user?.email as string,
        },
      });
      session.user.id = (sessionUser?.userID as string).toString();
      session.user.role = (sessionUser?.role as string).toString();
      return session;
    },
    async signIn({ profile }: any) {
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
        console.log('🚀 ~ file: route.js:34 ~ signIn ~ error:', error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
