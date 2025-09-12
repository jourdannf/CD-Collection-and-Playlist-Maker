import pool from "@/lib/db";
import * as z from 'zod';
import { userRegisterationSchema } from "@/auth/nextjs/zodSchemas";
import { redirect } from "next/navigation";
import { generateSalt, hashPassword } from "@/auth/core/passwordHasher";
import { createUserSession, setCookie } from "@/auth/core/session";

export async function POST(request) {
    /**
     * Body makeup
     * {
     *  username or email: string
     *  password: string
     * }
     */
    
    try {
        const body = await request.json();
        
        const {success, data} = userRegisterationSchema.safeParse(body);

        if (!success) { // handle not successful option

        }

        //Search database for email
        const existingUser = await pool.query(`
            SELECT * from users WHERE email = $1    
        `, [data.email]);

        if (existingUser.rowCount) return Response.json( {email: "Account already exists for this email"}, {status: 409});

        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password, salt);

        const values = [data.username, hashedPassword, data.email, salt];

        const result = await pool.query(`
            INSERT INTO users (username, password, email, salt)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `, values)

        const newUser = result.rows[0];

        if (!newUser) return Response.json("Unable to create new user", {status: 500});
        
        try {
            await createUserSession(newUser);
        }catch (e) {
            pool.query("ROLLBACK");
            throw e;
        }

        return Response.json(`New user created with ${newUser.id}`, {status: 201});

        // redirect('/')


    }catch (e) {
        pool.query("ROLLBACK");
        throw e;
    }
}