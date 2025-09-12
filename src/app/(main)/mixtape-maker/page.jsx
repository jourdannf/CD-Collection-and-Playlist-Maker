import BoomboxPage from "./(components)/BoomboxPage";
import TracklistFilter from "./(components)/TracklistFilter";
import DispenseAlbumsPage from "./(components)/DispenseAlbumsPage";
import { fetchBoomboxTracks } from "@/lib/utils/fetchTracks";

export default async function MixtapeMakerPage ({searchParams}) {

    // const [insideBoombox, setInsideBoombox] = useState([]);
    // const [createPlaylist, setCreatePlaylist] = useState(false);

    //Make a client component and pass it two render functions for Boombox and Playlist created in order to keep those two as server components

    const query = (await searchParams)?.query || "";
    //Call a function that will get what's inside the boombox
    //It will pass that to the boombox page
    const insideBoomboxData = await fetchBoomboxTracks();
    
    return (
        <>
            {/* {createPlaylist ? <PlaylistCreatedPage insideBoombox={insideBoombox} createPlaylist={createPlaylist} /> : <BoomboxPage insideBoombox={insideBoombox} setInsideBoombox={setInsideBoombox} setCreatePlaylist={setCreatePlaylist} />} */}

            <BoomboxPage insideBoomboxData={insideBoomboxData}>
                <TracklistFilter query={query} />
            </BoomboxPage>

            {/* <BoomboxPage query={query} /> */}
        </>
    )

    
}