"use client";

import { useUserContext } from "@/lib/utils/contexts";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserInfo({className}) {
    // const user = useUserContext();

    const {user, fetchUser} = useUserContext();
    const [isLoggedOut, setLoggedOut] = useState({
        success: false,
        message: ""
    });

    useEffect( () => {
        fetchUser();
    }, []);

    function handleClick(e) {
        e.stopPropagation();
        e.preventDefault();

        const opts = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`, opts);
        if (!response.ok) setLoggedOut({success: false, message: "User cannot be logged out"});

         redirect("/");
    };


    return (
        <div className="flex gap-1.5 ">
            <p>{user?.user_id}</p><button className="hover:underline" onClick={handleClick}>(Log out)</button>
        </div>
    )
    
}