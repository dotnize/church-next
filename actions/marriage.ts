"use server";

import { getConnection } from "~/lib/db";

export async function getMarriages() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM marriagecert");
    return rows;
}

export async function createMarriage(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("INSERT INTO marriagecert SET ?", {
            legal_status: formData.get("legal_status"),
            husband_name: formData.get("husband_name"),
            husband_actual_address: formData.get("husband_actual_address"),
            husband_age: formData.get("husband_age"),
            husband_place_of_birth: formData.get("husband_place_of_birth"),
            husband_date_of_baptism: formData.get("husband_date_of_baptism"),
            husband_place_of_baptism: formData.get("husband_place_of_baptism"),
            husband_father: formData.get("husband_father"),
            husband_mother: formData.get("husband_mother"),
            wife_name: formData.get("wife_name"),
            wife_actual_address: formData.get("wife_actual_address"),
            wife_age: formData.get("wife_age"),
            wife_place_of_birth: formData.get("wife_place_of_birth"),
            wife_date_of_baptism: formData.get("wife_date_of_baptism"),
            wife_place_of_baptism: formData.get("wife_place_of_baptism"),
            wife_father: formData.get("wife_father"),
            wife_mother: formData.get("wife_mother"),
            witness: formData.get("witness"),
            date_of_marriage: formData.get("date_of_marriage"),
            position: formData.get("position"),
            book_number: formData.get("book_number"),
            page_number: formData.get("page_number"),
            parish_priest: formData.get("parish_priest"),
            solemnization_date: formData.get("solemnization_date"),
            solemnization_place: formData.get("solemnization_place"),
        });
    } catch (err) {
        return;
    }
}

export async function updateMarriage(formData: FormData) {
    try {
        const db = await getConnection();
        await db.query("UPDATE marriagecert SET ? WHERE id = ?", [
            {
                legal_status: formData.get("legal_status"),
                husband_name: formData.get("husband_name"),
                husband_actual_address: formData.get("husband_actual_address"),
                husband_age: formData.get("husband_age"),
                husband_place_of_birth: formData.get("husband_place_of_birth"),
                husband_date_of_baptism: formData.get("husband_date_of_baptism"),
                husband_place_of_baptism: formData.get("husband_place_of_baptism"),
                husband_father: formData.get("husband_father"),
                husband_mother: formData.get("husband_mother"),
                wife_name: formData.get("wife_name"),
                wife_actual_address: formData.get("wife_actual_address"),
                wife_age: formData.get("wife_age"),
                wife_place_of_birth: formData.get("wife_place_of_birth"),
                wife_date_of_baptism: formData.get("wife_date_of_baptism"),
                wife_place_of_baptism: formData.get("wife_place_of_baptism"),
                wife_father: formData.get("wife_father"),
                wife_mother: formData.get("wife_mother"),
                witness: formData.get("witness"),
                date_of_marriage: formData.get("date_of_marriage"),
                position: formData.get("position"),
                book_number: formData.get("book_number"),
                page_number: formData.get("page_number"),
                parish_priest: formData.get("parish_priest"),
                solemnization_date: formData.get("solemnization_date"),
                solemnization_place: formData.get("solemnization_place"),
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
        return;
    }
}
