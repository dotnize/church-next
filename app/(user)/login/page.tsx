"use client";

import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { login } from "~/lib/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [state, formAction] = useFormState(login, undefined);

  return (
    <div className="flex flex-col gap-4">
      <Link color="foreground" underline="always" href="/">
        &#x2190; Back
      </Link>
      <div className="flex items-center justify-center gap-6 rounded-xl bg-gray-600 bg-[url('/loginbg2.png')] bg-cover p-8 bg-blend-overlay drop-shadow-lg">
        <form action={formAction} className="flex w-64 flex-col gap-4">
          <h1 className="w-full text-center text-3xl font-bold text-white">Admin Login</h1>
          <div className="flex w-full flex-col gap-2">
            <Input
              name="username"
              required
              value={username}
              onValueChange={setUsername}
              size="sm"
              label="Username"
            />
            <Input
              name="password"
              required
              value={password}
              onValueChange={setPassword}
              size="sm"
              label="Password"
              type="password"
              errorMessage={state?.message || undefined}
            />
          </div>
          <Button color="primary" size="md" type="submit">
            Login
          </Button>
        </form>
        <Image src="/logo.png" alt="Saint Michael Parish Church" width={256} height={256} />
      </div>
    </div>
  );
}
