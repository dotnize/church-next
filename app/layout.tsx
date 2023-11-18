import type { Metadata } from "next";
import { Providers } from "~/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="light" lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
