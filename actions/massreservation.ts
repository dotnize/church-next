"use server";

import { format } from "date-fns";
import { getConnection } from "~/lib/db";

export async function getMassReservations() {
    const db = await getConnection();
    const [rows] = await db.query("SELECT * FROM mass_reservations");
    return rows;
}

export async function createMassReservation(formData: FormData) {
    try {
        const [time_start, time_end] = formData.get("time").toString().split(" - ");
        //convert AM/PM to 24hr format
        const schedule_time_start = format(new Date(`2021-01-01 ${time_start}`), "HH:mm:ss");
        const schedule_time_end = format(new Date(`2021-01-01 ${time_end}`), "HH:mm:ss");

        const db = await getConnection();
        await db.query("INSERT INTO mass_reservations SET ?", {
            requester_name: formData.get("requester_name"),
            contact_number: formData.get("contact_number"),
            type_of_mass: formData.get("type_of_mass"),
            priest_id: formData.get("priest_id"),
            place_of_mass_event: formData.get("place_of_mass_event"),
            date_requested: formData.get("date_requested"),
            schedule_time_start,
            schedule_time_end,
        });
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function updateMassReservation(formData: FormData) {
    try {
        const [time_start, time_end] = formData.get("time").toString().split(" - ");
        //convert AM/PM to 24hr format
        const schedule_time_start = format(new Date(`2021-01-01 ${time_start}`), "HH:mm:ss");
        const schedule_time_end = format(new Date(`2021-01-01 ${time_end}`), "HH:mm:ss");

        const db = await getConnection();
        await db.query("UPDATE mass_reservations SET ? WHERE id = ?", [
            {
                requester_name: formData.get("requester_name"),
                contact_number: formData.get("contact_number"),
                type_of_mass: formData.get("type_of_mass"),
                priest_id: formData.get("priest_id"),
                place_of_mass_event: formData.get("place_of_mass_event"),
                date_requested: formData.get("date_requested"),
                schedule_time_start,
                schedule_time_end,
            },
            formData.get("id"),
        ]);
    } catch (err) {
        console.log(err);
        return;
    }
}

export async function deleteMassReservation(id: number) {
    try {
        const db = await getConnection();
        await db.query("DELETE FROM mass_reservations WHERE id = ?", [id]);
    } catch (err) {
        console.log(err);
        return;
    }
}
