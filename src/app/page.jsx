//Check if user is logged in
//If logged in then redirect to the dashboard
//Otherwise redirect to the sign in page

import { getUserBySession } from "@/auth/core/session";
import { redirect } from "next/navigation";
import Home from "./(main)/dashboard/page";

export default async function IndexPage () {

    const user = await getUserBySession();

    if (!user) redirect('/login');

    redirect('/dashboard')

}