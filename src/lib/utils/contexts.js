"use client"

import { getUserBySession } from "@/auth/core/session";
//Provides context for tracks that are inside the boombox that needs to be cloned

import { createContext, useContext, useState } from "react";

export const InsideBoomboxContext = createContext(null);

export function DraggableTracklistProvider({children, value}) {
    return <InsideBoomboxContext.Provider value={value}>{children}</InsideBoomboxContext.Provider>
}

export const UserContext = createContext(undefined);

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        setUser(await getUserBySession({getFullUser: true}));
    }

    return <UserContext.Provider value={{user, fetchUser}}>{children}</UserContext.Provider>
}

export function useUserContext(props) {

    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used with a user context");
    }

    return user;
}