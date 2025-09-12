"use server";

import pool from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";

//seven days
const SESSION_EXPIRATION_SECONDS = 60*60*24*7;
const COOKIE_SESSION_KEY = "session-id";

export async function createUserSession(user) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();

    try {
        await pool.query(`
            INSERT INTO user_sessions (user_id, session_id, expiry_date)
                VALUES ($1, $2, CURRENT_TIMESTAMP + interval '1 second' * $3)  
        `, [user.id, sessionId, SESSION_EXPIRATION_SECONDS]);

        // console.log("We are in create user sessions")
        setCookie(sessionId);
    }catch (e) {
        pool.query("ROLLBACK");
        throw e;
    }
}

async function setCookie(sessionId) {
    const cookieStore = await cookies();

    console.log(COOKIE_SESSION_KEY);
    
    cookieStore.set(COOKIE_SESSION_KEY, sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000
    });
}