import { Session } from "next-auth";
import { headers } from "next/headers";
import AuthContext from "./AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.css";

async function getSession(cookie: string): Promise<Session> {
  // const response = await fetch(
  console.log("my log", `${process.env.LOCAL_AUTH_URL}/api/auth/session`);
  //   {
  //     headers: {
  //       cookie,
  //     },
  //   }
  // );
  // console.log("response", response);
  // const session = await response.json();
  // return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <body>
      <AuthContext session={session}>
        <Navbar />
        {children}
        <Footer />
      </AuthContext>
    </body>
  );
}
