import { redirect } from "next/navigation";
import { getSession } from "~/lib/auth";

export default async function Loginlayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (session && session.isLoggedIn) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
