import PlaylistCreatedPage from "./(components)/PlaylistCreatedPage";
// import { useState } from "react";

import BoomboxPage from "./(components)/BoomboxPage";


export default async function MixtapeMakerPage ({searchParams}) {

    // const [insideBoombox, setInsideBoombox] = useState([]);
    // const [createPlaylist, setCreatePlaylist] = useState(false);

    const query = (await searchParams)?.query || "";
    
    return (
        <>
            {/* {createPlaylist ? <PlaylistCreatedPage insideBoombox={insideBoombox} createPlaylist={createPlaylist} /> : <BoomboxPage insideBoombox={insideBoombox} setInsideBoombox={setInsideBoombox} setCreatePlaylist={setCreatePlaylist} />} */}

            <BoomboxPage query={query} />
        </>
    )

    
}