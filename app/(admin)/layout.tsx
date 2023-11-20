import type { Metadata } from "next";
import Sidebar from "~/components/Sidebar";

export const metadata: Metadata = {
  title: "Admin - Saint Michael Parish Church",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
}
