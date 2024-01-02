"use server";

import { nanoid } from "nanoid";
import { getConnection } from "~/lib/db";

export async function getConfirmations() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM confirmationcert");
    return rows;
}

export async function getConfirmationById(id: string) {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM confirmationcert WHERE transactionId = ?", [id]);
    return rows;
}

export async function createConfirmation(formData: FormData) {
    try {
        const transactionId = nanoid(8);
        const db = await getConnection();
        const insertResult = await db.query("INSERT INTO confirmationcert SET ?", {
            name: formData.get("name"),
            father_name: formData.get("father_name"),
            mother_name: formData.get("mother_name"),
            church_name: formData.get("church_name"),
            date: formData.get("date"),
            sponsor1: formData.get("sponsor1"),
            sponsor2: formData.get("sponsor2"),
            book_number: formData.get("book_number") || null,
            page_number: formData.get("page_number") || null,
            date_of_issue: formData.get("date_of_issue") || null,
            parish_priest: formData.get("parish_priest"),
            requester_name: formData.get("requester_name"),
            submitted_requirements: formData.get("submitted_requirements"),
            status: formData.get("status") || "Pending",
            date_requested: new Date(),
            transactionId,
            receiptNo: formData.get("receiptNo") || null,
        });
        return transactionId;
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function updateConfirmation(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("UPDATE confirmationcert SET ? WHERE id = ?", [
            {
                name: formData.get("name"),
                father_name: formData.get("father_name"),
                mother_name: formData.get("mother_name"),
                church_name: formData.get("church_name"),
                date: formData.get("date"),
                sponsor1: formData.get("sponsor1"),
                sponsor2: formData.get("sponsor2"),
                book_number: formData.get("book_number"),
                page_number: formData.get("page_number"),
                date_of_issue: formData.get("date_of_issue"),
                parish_priest: formData.get("parish_priest"),
                requester_name: formData.get("requester_name"),
                status: formData.get("status") || "pending",
                receiptNo: formData.get("receiptNo") || null,
            },
            formData.get("id"),
        ]);
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function deleteConfirmation(id: number) {
    try {
        const db = await getConnection();
        await db.query("DELETE FROM confirmationcert WHERE id = ?", [id]);
    } catch (err) {
        console.log(err);
        return;
    }
}
