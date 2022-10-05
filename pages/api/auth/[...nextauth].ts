import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '../../../services/prisma';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session({session}) {
      const email = session.user?.email

      if(email && !session.userId) {
        const data = await prisma.user.findUnique({
          where: {email: email}
        })

        if(data?.id) {
          return { ...session, userId: data.id }
        }
      }
      return { ...session }
    },

    async signIn({user, account, profile, credentials}) {
      const { email, name } = user

      if(email) {
       const data = await prisma.user.findUnique({
          where: { email }
        })

        if(!data) {
          const data = await prisma.user.create({
            data: {
              email, name
            }
          })
          return true
        }
        return true
      }


    }
  }
})
