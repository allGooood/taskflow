import { prisma } from "@/app/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],  
  pages: {
      signIn: '/signin'
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    //JWT 만들때 실행
    jwt: async ({ token, user }) => {
      console.log('-----jwt-----')
      console.log(token);

      // if (user) {
      //     token.user = {};
      //     token.user.name = user.name;
      //     token.user.email = user.email;
      // }
      return token;
    },

    //유저 Session 조회 시 실행
    session: async ({ session, token }) => {

      console.log('-----session-----')
      console.log(session);
      console.log(token);

      // session.user = token.user;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
}
const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
