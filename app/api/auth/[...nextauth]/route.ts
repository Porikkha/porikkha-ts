import NextAuth, { DefaultSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/utils/database';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 40000,
      },
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text', placeholder: 'youremail@email.com' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     const user = {
    //       id: '1',
    //       username: 'dummy',
    //       email: 'test@gmail.com',
    //       password: 'test',
    //       role: 'examiner',
    //     };
    //     if (
    //       credentials?.email === user.email &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
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
      console.log(session.user);
      return session;
    },
    async signIn({ profile, credentials }: any) {
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
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
