"use client";

import { useUserContext } from "@/lib/utils/contexts";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserInfo({className}) {
    const {user, fetchUser} = useUserContext();
    const [isLoggedOut, setLoggedOut] = useState({
        success: false,
        message: ""
    });

    const pathname = usePathname();
    const hideUserPath = ["/my-collection/add"]

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

    if (hideUserPath.includes(pathname)) return;

    return (
        <div className="flex gap-1.5 justify-end">
            <p>{user?.username}</p><button className="hover:underline" onClick={handleClick}>(Log out)</button>
        </div>
    )
    
}