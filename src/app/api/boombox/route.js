import pool from "@/lib/db";

export async function GET () {
    try {
        const result = await pool.query(`SELECT * FROM boombox`);
        return Response.json(result.rows, {status: 200});
    }catch (e) {
        await pool.query("ROLLBACK");
        throw e;
    }
}

export async function POST (request) {
// add track id to boombox    

    try {
        const req = await request.json();
        const track_id = req.track_id;

        const res = await pool.query(`
            INSERT INTO boombox (track_id)
            VALUES ($1)
        `, [track_id]);

        if (!res.rowCount) return Response.json("Unable to add track to boombox", {status: 500});

        return Response.json(res.rows, {status: 201});
    }catch (e) {
        throw e;
    }
}

export async function DELETE (request) { // add for deleting specific track id later
    const searchParams = request.nextUrl.searchParams;

    try {
        if (!searchParams.has("track_id")) {
            const res = await pool.query(`TRUNCATE boombox`);

            return Response.json(res.rows, {status: 200, statusText: "All tracks were deleted from the boombox"});
        }else {
            //Do the work to make it delete by track id 
        }

    }catch (e) {
        throw e;
    }

}