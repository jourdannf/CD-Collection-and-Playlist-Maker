"use server";

import pool from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";
import { sessionSchema } from "../nextjs/zodSchemas";

//seven days
const SESSION_EXPIRATION_SECONDS = 60*60*24*7;
const COOKIE_SESSION_KEY = "session-id";

export async function createUserSession(user, cookies) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();

    try {
        await pool.query(`
            INSERT INTO user_sessions (user_id, session_id, expiry_date)
                VALUES ($1, $2, CURRENT_TIMESTAMP + interval '1 second' * $3)  
        `, [user.id, sessionId, SESSION_EXPIRATION_SECONDS]);

        // console.log("We are in create user sessions")
        await setCookie(sessionId, cookies);
    }catch (e) {
        pool.query("ROLLBACK");
        throw e;
    }
}

export async function getUserBySession() {//might have to change location because I don't want this to necessarily be a server action
    const sessionId = (await cookies()).get(COOKIE_SESSION_KEY);
    if (!sessionId?.value) return null;

    const user = await pool.query(`
        SELECT user_id FROM user_sessions
            WHERE session_id = $1
            AND expiry_date > NOW()
    `, [sessionId.value]);

    const currentUser = user.rows[0]


    const {success, data} = sessionSchema.safeParse(currentUser);

    if (!success) return null;
    return currentUser;
}

export async function removeUserFromSession() {
    const cookiesStore = await cookies()
    const sessionId = cookiesStore.get(COOKIE_SESSION_KEY);
    if (!sessionId?.value) return null;

    const result = await pool.query(`
        DELETE FROM user_sessions
            WHERE session_id = $1
    `, [sessionId.value]);

    if (!result.rowCount) return null;

    cookiesStore.delete(COOKIE_SESSION_KEY);
}

async function setCookie(sessionId, cookies) {
    
    cookies.set(COOKIE_SESSION_KEY, sessionId, {// TODO: set secure to true for production
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000
    });
}



