"use client";

import PlaylistCreatedPage from "./(components)/PlaylistCreatedPage";
import { useState } from "react";

import BoomboxPage from "./(components)/BoomboxPage";


export default function PlaylistMaker () {

    const [insideBoombox, setInsideBoombox] = useState([]);
    const [createPlaylist, setCreatePlaylist] = useState(false);

    
    
    return (
        <>
            {createPlaylist ? <PlaylistCreatedPage insideBoombox={insideBoombox} createPlaylist={createPlaylist} /> : <BoomboxPage insideBoombox={insideBoombox} setInsideBoombox={setInsideBoombox} setCreatePlaylist={setCreatePlaylist} />}
        </>
    )

    
}