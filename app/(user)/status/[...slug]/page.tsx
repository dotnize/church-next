import { Image, Link } from "@nextui-org/react";
import { redirect } from "next/navigation";

import StatusPage from "~/components/StatusPage";

export default function Status({ params }: { params: { slug: string[] } }) {
  const [typeParam, id] = params.slug;
  if (!typeParam || !id || !["c", "m", "b", "d"].includes(typeParam)) {
    redirect("/");
  }
  const type = typeParam as "c" | "m" | "b" | "d";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image src="/logo.png" alt="Saint Michael Parish Church" width={64} height={64} />
        Saint Michael Parish Church
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href="/"
          color="foreground"
          className="self-start font-semibold transition-all hover:underline"
        >
          &larr; Back to home
        </Link>
        <StatusPage type={type} id={id} />
      </div>
    </div>
  );
}
