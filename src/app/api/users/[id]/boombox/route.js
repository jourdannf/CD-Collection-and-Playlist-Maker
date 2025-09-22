import pool from "@/lib/db";

export async function GET (request, {params}) {
    try {
        const {id} = await params;
        const result = await pool.query(`SELECT * FROM boombox`); // add where based on user id
        return Response.json(result.rows, {status: 200});
    }catch (e) {
        await pool.query("ROLLBACK");
        throw e;
    }
}

export async function POST (request, {params}) {
// add track id to boombox    

    try {
        const {id} = await params;
        const req = await request.json();
        const track_id = req.track_id;

        const res = await pool.query(` 
            INSERT INTO boombox (track_id, user_id)
            VALUES ($1, $2)
        `, [track_id, id]);

        if (!res.rowCount) return Response.json("Unable to add track to boombox", {status: 500});
        return Response.json(res.rows, {status: 201});
    }catch (e) {
        throw e;
    }
}

export async function DELETE (request, {params}) { // add for deleting specific track id later

    try {
        const {id} = await params;
        console.log("here")
        await pool.query(`DELETE FROM boombox WHERE user_id = $1`, [id]);

        return new Response(null, {status: 204});

    }catch (e) {
        throw e;
    }

}