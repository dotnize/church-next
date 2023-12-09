"use server";

import { getConnection } from "~/lib/db";

export async function getPriests() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM priests");
    return rows as any;
}

export async function createPriest(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("INSERT INTO priests SET ?", {
            name: formData.get("name"),
        });
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function updatePriest(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("UPDATE priests SET ? WHERE id = ?", [
            {
                name: formData.get("name"),
            },
            formData.get("id"),
        ]);
    } catch (err) {
        console.log(err);
        return;
    }
}
export async function deletePriest(id: number) {
    try {
        const db = await getConnection();
        await db.query("DELETE FROM priests WHERE id = ?", [id]);
    } catch (err) {
        console.log(err);
        return;
    }
}

// TODO: edit, update, & delete?
