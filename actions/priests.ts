"use server";

import { getConnection } from "~/lib/db";

export async function getPriests() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM priests");
    return rows as any;
}

// TODO: edit, update, & delete?
