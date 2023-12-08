"use server";

import { getConnection } from "~/lib/db";

export async function getDeceased() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM deceased_information");
    return rows;
}

export async function createDeceased(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("INSERT INTO deceased_information SET ?", {
            volume: formData.get("volume"),
            pageNumber: formData.get("pageNumber"),
            entryNumber: formData.get("entryNumber"),
            deceasedName: formData.get("deceasedName"),
            residence: formData.get("residence"),
            age: formData.get("age"),
            dateOfDeath: formData.get("dateOfDeath"),
            burialInfo: formData.get("burialInfo"),
            dateOfBurial: formData.get("dateOfBurial"),
            placeOfBurial: formData.get("placeOfBurial"),
            relativeInfo: formData.get("relativeInfo"),
            date_of_issue: formData.get("date_of_issue"),
            parish_priest: formData.get("parish_priest"),
        });
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function updateDeceased(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("UPDATE deceased_information SET ? WHERE id = ?", [
            {
                volume: formData.get("volume"),
                pageNumber: formData.get("pageNumber"),
                entryNumber: formData.get("entryNumber"),
                deceasedName: formData.get("deceasedName"),
                residence: formData.get("residence"),
                age: formData.get("age"),
                dateOfDeath: formData.get("dateOfDeath"),
                burialInfo: formData.get("burialInfo"),
                dateOfBurial: formData.get("dateOfBurial"),
                placeOfBurial: formData.get("placeOfBurial"),
                relativeInfo: formData.get("relativeInfo"),
                date_of_issue: formData.get("date_of_issue"),
                parish_priest: formData.get("parish_priest"),
            },
            formData.get("id"),
        ]);
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function deleteDeceased(id: number) {
    try {
        const db = await getConnection();
        await db.query("DELETE FROM deceased_information WHERE id = ?", [id]);
    } catch (err) {
        console.log(err);
        return;
    }
}
