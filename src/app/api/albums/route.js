import pool from "@/lib/db";

export async function GET(req) {
    const res = await pool.query('SELECT * FROM albums');
    return Response.json(res.rows);
}