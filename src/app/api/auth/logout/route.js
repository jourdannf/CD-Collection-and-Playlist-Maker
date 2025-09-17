import { removeUserFromSession } from "@/auth/core/session";
import { cookies } from "next/headers";

export async function POST(request) {
    const body = await request.json();
    //validate data
    //remove from user sessions in database
    //remove from cookies in browser

    await removeUserFromSession();
    return Response.json("User logged out", {status: 200});
}