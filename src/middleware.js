import { NextResponse } from "next/server"
import { getUserBySession } from "./auth/core/session";

const userRoutes = ["/dashboard", "/mixtape-maker", "my-collection"];
const disocgRoutes = ["/my-wishlist"];

export async function middleware(request) {
    const response = await middlewareAuth(request) ?? NextResponse.next();

    return response;
}

async function middlewareAuth(request) {
    const path = request.nextUrl.pathname;
    if (userRoutes.includes(path)) {
        const user = await getUserBySession();
        if (!user) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
    runtime: 'nodejs',
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
    ]
}
