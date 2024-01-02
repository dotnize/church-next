"use server";

import type { ResultSetHeader } from "mysql2/promise";
import { getConnection } from "~/lib/db";

export async function getDeceased() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM deceased_information");
    return rows;
}

export async function getDeceasedById(id: number) {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM deceased_information WHERE id = ?", [id]);
    return rows;
}

export async function createDeceased(formData: FormData) {
    try {
        const db = await getConnection();
        const insertResult = await db.query("INSERT INTO deceased_information SET ?", {
            volume: formData.get("volume"),
            pageNumber: formData.get("pageNumber"),
            entryNumber: formData.get("entryNumber"),
            lastName: formData.get("lastName"),
            firstName: formData.get("firstName"),
            middleInitial: formData.get("middleInitial"),
            suffix: formData.get("suffix"),
            residence: formData.get("residence"),
            age: formData.get("age"),
            dateOfDeath: formData.get("dateOfDeath"),
            burialInfo: formData.get("burialInfo"),
            dateOfBurial: formData.get("dateOfBurial"),
            placeOfBurial: formData.get("placeOfBurial"),
            relativeInfo: formData.get("relativeInfo"),
            date_of_issue: formData.get("date_of_issue") || null,
            parish_priest: formData.get("parish_priest"),
            requester_name: formData.get("requester_name"),
            submitted_requirements: formData.get("submitted_requirements"),
            status: formData.get("status") || "Pending",
        });
        return (insertResult[0] as ResultSetHeader).insertId;
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
                lastName: formData.get("lastName"),
                firstName: formData.get("firstName"),
                middleInitial: formData.get("middleInitial"),
                suffix: formData.get("suffix"),
                residence: formData.get("residence"),
                age: formData.get("age"),
                dateOfDeath: formData.get("dateOfDeath"),
                burialInfo: formData.get("burialInfo"),
                dateOfBurial: formData.get("dateOfBurial"),
                placeOfBurial: formData.get("placeOfBurial"),
                relativeInfo: formData.get("relativeInfo"),
                date_of_issue: formData.get("date_of_issue"),
                parish_priest: formData.get("parish_priest"),
                requester_name: formData.get("requester_name"),
                submitted_requirements: formData.get("submitted_requirements"),
                status: formData.get("status") || "pending",
                date_requested: new Date(),
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
