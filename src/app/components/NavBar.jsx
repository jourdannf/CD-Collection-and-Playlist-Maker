'use client'
import { useState } from "react";

import NavBarItem from "./NavBarItem"

export default function NavBar ({items}) {
    const [active, setActive] = useState(false);
    
    return (
        <>
        <ul>
            {items.map((item, i) => {
                return <NavBarItem key={`${item.name}_${i}`} info={item} state={active} />
            })}
        </ul>
        </>
    )
}