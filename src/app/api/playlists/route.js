import pool from "@/lib/db";

export async function GET() {

    try {
        const res = await pool.query(`SELECT * FROM playlists`);

        return Response.json(res.rows, {status: 200});
    }catch (e) {
        console.log(e);
        throw e;
    }
    
}

export async function POST(request) {
    try{
        if (typeof request.name != "string") {
            return Response.json("Invalid Data", {status: 400});
        }

        const values = [request.name];
        const res = await pool.query(`
            INSERT INTO playlists (playlist_name) VALUES ($1);            
            `, values);

        return Response.json(res.rows[0], {status: 200});
    }catch (e) {
        console.log(e);
        throw e;
    }
}