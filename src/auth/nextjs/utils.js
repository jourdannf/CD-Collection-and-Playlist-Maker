import { cookies } from "next/headers";

export async function getUserBySession(sessionId) {
    const user = (await cookies()).get('session-id')
}