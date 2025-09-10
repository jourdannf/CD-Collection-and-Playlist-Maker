import pool from "@/lib/db";
import * as z from 'zod';
import { userRegisterationSchema } from "@/lib/utils/zodSchemas";

export async function POST(request) {
    /**
     * Body makeup
     * {
     *  username or email: string
     *  password: string
     * }
     */
    
    try {
        const req = await request.json();
        //transform password to jwt
        

    }catch (e) {
        throw e;
    }
}