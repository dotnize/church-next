"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); // temp
  return (
    <div className="flex items-center justify-center gap-6 rounded-xl bg-gray-600 bg-[url('/loginbg2.png')] bg-cover p-8 bg-blend-overlay drop-shadow-lg">
      <div className="flex w-64 flex-col gap-4">
        <h1 className="w-full text-center text-3xl font-bold text-white">Admin Login</h1>
        <div className="flex w-full flex-col gap-2">
          <Input size="sm" label="Username" />
          <Input size="sm" label="Password" type="password" />
        </div>
        <Button
          color="primary"
          size="md"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Login
        </Button>
      </div>
      <Image src="/logo.png" alt="Saint Michael Parish Church" width={256} height={256} />
    </div>
  );
}
