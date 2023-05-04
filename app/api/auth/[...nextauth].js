import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { connectToDatabase } from "../../../utils/db";

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { client, db } = await connectToDatabase();
        const user = await db
          .collection("assignment2")
          .findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          return { id: user._id, name: user.name, username: user.username };
        } else {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],

  adapter: Adapters.TypeORM.Adapter(await connectToDatabase()),

  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },

  // pages: {
  //   // Add custom pages if needed
  // },

  // Any other options you need
});
