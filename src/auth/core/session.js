"use server";

import pool from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";
import { sessionSchema } from "../nextjs/zodSchemas";
import { cache } from "react";

//seven days
const SESSION_EXPIRATION_SECONDS = 60*60*24*7;
const COOKIE_SESSION_KEY = "session-id";

export const getCurrentUser = async () => {

}

export async function createUserSession(user) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();

    try {
        await pool.query(`
            INSERT INTO user_sessions (user_id, session_id, expiry_date)
                VALUES ($1, $2, CURRENT_TIMESTAMP + interval '1 second' * $3)  
        `, [user.id, sessionId, SESSION_EXPIRATION_SECONDS]);

        // console.log("We are in create user sessions")
        await setCookie(sessionId);
    }catch (e) {
        pool.query("ROLLBACK");
        throw e;
    }
}

export async function getUserBySession({getFullUser = false} = {}) {//might have to change location because I don't want this to necessarily be a server action

    
    const sessionId = (await cookies()).get(COOKIE_SESSION_KEY);
    if (!sessionId?.value) return null;

    const user = await pool.query(`
        SELECT user_id FROM user_sessions
            WHERE session_id = $1
            AND expiry_date > NOW()
    `, [sessionId.value]);

    let currentUser = user.rows[0]

    const {success, data} = sessionSchema.safeParse(currentUser);
    console.log(success)

    if (!success) return null;

    //If there's an option or prop to get full user, then change currentUser to query from db for full user
    if (getFullUser) {
        const fullUser = await pool.query(`
            SELECT id, username, email FROM users
                WHERE id = $1
        `, [currentUser.user_id]);

        //TODO: validate

        currentUser = fullUser.rows[0];

        if (!fullUser.rowCount) throw new Error("User not found in database");
    }
    
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

async function setCookie(sessionId) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_SESSION_KEY, sessionId, {// TODO: set secure to true for production
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000
    });
}



