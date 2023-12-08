"use server";

import { getConnection } from "~/lib/db";

export async function getBaptisms() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM baptismcert");
    return rows;
}

export async function createBaptism(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("INSERT INTO baptismcert SET ?", {
            child_name: formData.get("child_name"),
            birth_place: formData.get("birth_place"),
            date_of_birth: formData.get("date_of_birth"),
            fathers_name: formData.get("fathers_name"),
            mothers_name: formData.get("mothers_name"),
            residence: formData.get("residence"),
            date_of_baptism: formData.get("date_of_baptism"),
            parish_priest: formData.get("parish_priest"),
            sponsor1: formData.get("sponsor1"),
            sponsor2: formData.get("sponsor2"),
            book_number: formData.get("book_number"),
            page_number: formData.get("page_number"),
            date_of_issue: formData.get("date_of_issue"),
        });
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function updateBaptism(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("UPDATE baptismcert SET ? WHERE id = ?", [
            {
                child_name: formData.get("child_name"),
                birth_place: formData.get("birth_place"),
                date_of_birth: formData.get("date_of_birth"),
                fathers_name: formData.get("fathers_name"),
                mothers_name: formData.get("mothers_name"),
                residence: formData.get("residence"),
                date_of_baptism: formData.get("date_of_baptism"),
                parish_priest: formData.get("parish_priest"),
                sponsor1: formData.get("sponsor1"),
                sponsor2: formData.get("sponsor2"),
                book_number: formData.get("book_number"),
                page_number: formData.get("page_number"),
                date_of_issue: formData.get("date_of_issue"),
            },
            formData.get("id"),
        ]);
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function deleteBaptism(id: number) {
    try {
        const db = await getConnection();
        await db.query("DELETE FROM baptismcert WHERE id = ?", [id]);
    } catch (err) {
        console.log(err);
        return;
    }
}
