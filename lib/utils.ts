import { format } from "date-fns";

export function getOrdinal(n: number | string) {
    const num = parseInt(n.toString());
    const s = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function dateFormatter(date) {
    return format(new Date(date), "MMMM do, yyyy");
}
