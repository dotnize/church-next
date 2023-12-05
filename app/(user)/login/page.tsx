"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter(); // temp
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onLogin() {
    if (username === "admin" && password === "1234") {
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
      setTimeout(() => setError(""), 5000);
    }
  }

  return (
    <div className="flex items-center justify-center gap-6 rounded-xl bg-gray-600 bg-[url('/loginbg2.png')] bg-cover p-8 bg-blend-overlay drop-shadow-lg">
      <div className="flex w-64 flex-col gap-4">
        <h1 className="w-full text-center text-3xl font-bold text-white">Admin Login</h1>
        <div className="flex w-full flex-col gap-2">
          <Input value={username} onValueChange={setUsername} size="sm" label="Username" />
          <Input
            value={password}
            onValueChange={setPassword}
            size="sm"
            label="Password"
            type="password"
            errorMessage={error || undefined}
          />
        </div>
        <Button color="primary" size="md" onClick={onLogin}>
          Login
        </Button>
      </div>
      <Image src="/logo.png" alt="Saint Michael Parish Church" width={256} height={256} />
    </div>
  );
}
