"use client"

import Image from "next/image";

export default function Boombox ({className, setDispenseAlbums, insideBoombox}) {

    const handleClick = (e) => {
        setDispenseAlbums(true);
        // if (insideBoombox.length !== 0) {setDispenseAlbums(true)};
    }

    return (
        <div 
            className={className}
        >
            <Image id="droppableBoombox" className={`hover:cursor-pointer ${false ? "drop-shadow-lg drop-shadow-amber-200": ""}`} src="/Boombox.svg" height={329} width={500} alt="Image of a boombox" onClick={handleClick} />
        </div>
    )
}