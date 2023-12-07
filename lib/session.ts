import { SessionOptions } from "iron-session";

export interface SessionData {
    username: string;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    username: "",
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "saintmichaeluser",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};
