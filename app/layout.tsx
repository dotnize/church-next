import type { Metadata } from "next";
import { Providers } from "~/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saint Michael Parish Church",
};

// TODO: auth, redirect to /login
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="light" lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
