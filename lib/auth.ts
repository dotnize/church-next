"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getConnection } from "./db";
import { SessionData, defaultSession, sessionOptions } from "./session";

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.username = defaultSession.username;
    }

    return session;
}

export async function logout() {
    // false => no db call for logout
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
    revalidatePath("/dashboard");
    redirect("/");
}

export async function login(prevState: any, formData: FormData) {
    try {
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);

        const username = (formData.get("username") as string) ?? "";
        const password = (formData.get("password") as string) ?? "";

        const db = await getConnection();
        const [rows] = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [
            username,
            password,
        ]);

        if (!rows || (rows as Array<any>).length === 0) {
            throw new Error("Invalid username or password");
        }

        session.username = username;
        session.isLoggedIn = true;
        await session.save();

        revalidatePath("/dashboard");
    } catch (e) {
        console.log(e);
        return { message: "Invalid username or password" };
    }
    redirect("/dashboard");
}
