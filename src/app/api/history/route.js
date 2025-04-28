import pool from "@/lib/db";

export async function GET() {
    try {
        const res = await pool.query(`SELECT * FROM listening_history LIMIT 15`);
        
        return Response.json(res.rows, {status: 200});
    }catch(e) {
        console.log(e);
        throw e;
    }

}