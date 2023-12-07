import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Sidebar from "~/components/Sidebar";
import { getSession } from "~/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Saint Michael Parish Church",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.username || !session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="flex bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
}
