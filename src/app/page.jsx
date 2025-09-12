//Check if user is logged in
//If logged in then redirect to the dashboard
//Otherwise redirect to the sign in page

import { getUserBySession } from "@/auth/core/session";
import { redirect } from "next/navigation";
import Home from "./dashboard/page";

export default async function IndexPage () {

    const user = await getUserBySession();

    if (!user) redirect('/sign-up');

    return (
        <Home user={user} />
    )

}