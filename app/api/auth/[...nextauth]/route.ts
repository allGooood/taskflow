import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';

const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],  

  pages: {
      signIn: '/signin'
  } 
}
const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
