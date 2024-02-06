import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth";
import { registerUser } from "../prisma/services";
import { RegisterUserType } from "@/types/user";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && account?.provider === "github") {
        token.accessToken = account.access_token;
        const user: RegisterUserType = {
          name: token.name as string,
          email: token.email as string,
          image: token.picture as string,
          type: account.provider,
        };
        const { data } = await registerUser(user);
        if ("id" in data) {
          token.userId = data.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if ("accessToken" in token) {
        session.accessToken = token.accessToken as string;
      }
      if ("userId" in token) {
        session.user.userId = token.userId as number;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const authServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const checkIsLogged = async (Response: any): Promise<any> => {
  const session = await authServerSession();
  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }
  return session;
};
