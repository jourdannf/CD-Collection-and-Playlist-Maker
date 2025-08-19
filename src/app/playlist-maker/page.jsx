"use client";

import PlaylistCreatedPage from "./(components)/PlaylistCreatedPage";
import { useState } from "react";

import BoomboxPage from "./(components)/BoomboxPage";


export default function PlaylistMaker () {
    const [selectedPage, setSelectedPage] = useState('makePlaylist');
    const [insideBoombox, setInsideBoombox] = useState([]);

    const pages = {
        makePlaylist: <BoomboxPage 
                        setSelectedPage={setSelectedPage} 
                        setInsideBoombox={setInsideBoombox} 
                        insideBoombox={insideBoombox} 
                    />,
        playlistCreated: <PlaylistCreatedPage insideBoombox={insideBoombox} />
    };

    const ActivePage = pages[selectedPage];
    
    return ActivePage

    
}