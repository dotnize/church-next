export const mysqlConfig = {
    host: "localhost",
    port: 3306,
    database: "saintmichaelchurch",
    user: "root",
    password: "",
};

export const minHoursBeforeReservation = 4;

export const massHours = [
    "04:30 AM - 05:30 AM",
    "06:00 AM - 07:00 AM",
    "08:00 AM - 09:00 AM",
    "09:30 AM - 10:30 AM",
    "11:30 AM - 12:30 PM",
    "03:00 PM - 04:00 PM",
    "05:00 PM - 06:00 PM",
    "06:30 PM - 07:30 PM",
];

// maybe temporary and just store in database?
export const massTypes = ["Thanksgiving Mass", "Barangay Mass", "School Mass", "Fiesta Mass"];
