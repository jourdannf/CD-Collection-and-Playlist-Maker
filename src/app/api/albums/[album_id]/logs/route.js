import pool from "@/lib/db";

export async function GET(request, {params}) {
    const {album_id} = await params;
    let qSearch = `SELECT * FROM music_logs WHERE album_id = $1 `;
    const searchParams = request.nextUrl.searchParams;
    
    if (searchParams.get("sort") === "ratings") {
        if (searchParams.get("order") == "ASC") {
            qSearch += "ORDER BY rating DESC, date_created ASC"
        }else if (searchParams.get("order" == "DESC")) {
            qSearch += "ORDER BY rating ASC, date_created ASC"
        }
        
    }

    if (searchParams.has("limit")) {
        let offsetVal = 0;

        if (searchParams.has("offset")){
            offsetVal = Number(searchParams.get("limit")) * Number(searchParams.get("offset"))
        }

        qSearch += `LIMIT ${searchParams.get("limit")} OFFSET ${String(offsetVal)}`
    }


    const res = await pool.query(qSearch, [album_id]);
    
    return Response.json(res.rows, {status: 200});
}

export async function POST(request, {params}) {
    const {album_id} = params;

    const req = await request.json();
    const body = req.body;
    const rating = req.rating;

    const values = [album_id, body, rating];

    const res = await pool.query(`
        INSERT INTO music_logs (album_id, body, rating)
        VALUES ($1, $2, $3) 
        `, values);
    
    return Response.json((await res.rows), {status: 201});
}