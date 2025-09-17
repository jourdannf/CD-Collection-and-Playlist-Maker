import { comparePasswords } from "@/auth/core/passwordHasher";
import { createUserSession } from "@/auth/core/session";
import { signInSchema } from "@/auth/nextjs/zodSchemas";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST (request) {
    console.log(request)
    
    try {
        const body = await request.json();
        const {success, data} = signInSchema.safeParse(body);

        

        const result = await pool.query(`
            SELECT * FROM users WHERE email = $1
        `, [data?.email]);

        const user = result.rows[0];

        if (!user) return Request.json("Invalid username or password", {status: 404});

        const isCorrectPassword = await comparePasswords({
            hashedPassword: user.password,
            password: data.password,
            salt: user.salt
        });

        if (!isCorrectPassword) return Response.json("Invalid username or password", {status: 404});
        await createUserSession(user, await cookies());

        
        return Response.json({data: user}, {status: 200});
        
        
    }catch (e) {
        console.log(e);
        throw e;
    }

}