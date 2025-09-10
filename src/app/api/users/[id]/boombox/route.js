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
            INSERT INTO boombox (track_id)
            VALUES ($1)
        `, [track_id]); // add where based on user id

        return Response.json(res.rows, {status: 201, statusText: "Track added to boombox"});
    }catch (e) {
        throw e;
    }
}

export async function DELETE (request, {params}) { // add for deleting specific track id later
    const searchParams = request.nextUrl.searchParams;

    try {
        const {id} = await params;
        if (!searchParams.has("track_id")) { // add delete based on user id
            const res = await pool.query(`TRUNCATE boombox`);

            return Response.json(res.rows, {status: 200, statusText: "All tracks were deleted from the boombox"});
        }else {
            //Do the work to make it delete by track id 
        }

    }catch (e) {
        throw e;
    }

}