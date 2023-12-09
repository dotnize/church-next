"use server";

import type { ResultSetHeader } from "mysql2/promise";
import { getConnection } from "~/lib/db";

export async function getMarriages() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM marriagecert");
    return rows;
}

export async function createMarriage(formData: FormData) {
    try {
        const db = await getConnection();
        const insertResult = await db.query("INSERT INTO marriagecert SET ?", {
            husband_legal_status: formData.get("husband_legal_status"),
            husband_name: formData.get("husband_name"),
            husband_actual_address: formData.get("husband_actual_address"),
            husband_age: formData.get("husband_age"),
            husband_place_of_birth: formData.get("husband_place_of_birth"),
            husband_date_of_baptism: formData.get("husband_date_of_baptism"),
            husband_place_of_baptism: formData.get("husband_place_of_baptism"),
            husband_father: formData.get("husband_father"),
            husband_mother: formData.get("husband_mother"),
            husband_witness: formData.get("husband_witness"),
            wife_legal_status: formData.get("wife_legal_status"),
            wife_name: formData.get("wife_name"),
            wife_actual_address: formData.get("wife_actual_address"),
            wife_age: formData.get("wife_age"),
            wife_place_of_birth: formData.get("wife_place_of_birth"),
            wife_date_of_baptism: formData.get("wife_date_of_baptism"),
            wife_place_of_baptism: formData.get("wife_place_of_baptism"),
            wife_father: formData.get("wife_father"),
            wife_mother: formData.get("wife_mother"),
            wife_witness: formData.get("wife_witness"),
            date_of_marriage: formData.get("date_of_marriage"),
            position: formData.get("position") || null,
            book_number: formData.get("book_number") || null,
            page_number: formData.get("page_number") || null,
            entry_number: formData.get("entry_number") || null,
            parish_priest: formData.get("parish_priest"),
            solemnization_date: formData.get("solemnization_date"),
            solemnization_place: formData.get("solemnization_place"),
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

export async function updateMarriage(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("UPDATE marriagecert SET ? WHERE id = ?", [
            {
                husband_legal_status: formData.get("husband_legal_status"),
                husband_name: formData.get("husband_name"),
                husband_actual_address: formData.get("husband_actual_address"),
                husband_age: formData.get("husband_age"),
                husband_place_of_birth: formData.get("husband_place_of_birth"),
                husband_date_of_baptism: formData.get("husband_date_of_baptism"),
                husband_place_of_baptism: formData.get("husband_place_of_baptism"),
                husband_father: formData.get("husband_father"),
                husband_mother: formData.get("husband_mother"),
                husband_witness: formData.get("husband_witness"),
                wife_legal_status: formData.get("wife_legal_status"),
                wife_name: formData.get("wife_name"),
                wife_actual_address: formData.get("wife_actual_address"),
                wife_age: formData.get("wife_age"),
                wife_place_of_birth: formData.get("wife_place_of_birth"),
                wife_date_of_baptism: formData.get("wife_date_of_baptism"),
                wife_place_of_baptism: formData.get("wife_place_of_baptism"),
                wife_father: formData.get("wife_father"),
                wife_mother: formData.get("wife_mother"),
                wife_witness: formData.get("wife_witness"),
                date_of_marriage: formData.get("date_of_marriage"),
                position: formData.get("position"),
                book_number: formData.get("book_number"),
                page_number: formData.get("page_number"),
                entry_number: formData.get("entry_number"),
                parish_priest: formData.get("parish_priest"),
                solemnization_date: formData.get("solemnization_date"),
                solemnization_place: formData.get("solemnization_place"),
                requester_name: formData.get("requester_name"),
                submitted_requirements: formData.get("submitted_requirements"),
                status: formData.get("status") || "pending",
            },
            formData.get("id"),
        ]);
    } catch (err) {
        return;
    }
}

export async function deleteMarriage(id: number) {
    try {
        const db = await getConnection();
        await db.query("DELETE FROM marriagecert WHERE id = ?", [id]);
    } catch (err) {
        console.log(err);
        return;
    }
}
