import MixtapeMakerClientWrapper from "./(components)/MixtapeMakerClientWrapper";
import BoomboxPage from "./(components)/BoomboxPage";
import TracklistFilter from "./(components)/TracklistFilter";
import DispenseAlbumsPage from "./(components)/DispenseAlbumsPage";

export default async function MixtapeMakerPage ({searchParams}) {

    // const [insideBoombox, setInsideBoombox] = useState([]);
    // const [createPlaylist, setCreatePlaylist] = useState(false);

    //Make a client component and pass it two render functions for Boombox and Playlist created in order to keep those two as server components

    const query = (await searchParams)?.query || "";

    
    return (
        <>
            {/* {createPlaylist ? <PlaylistCreatedPage insideBoombox={insideBoombox} createPlaylist={createPlaylist} /> : <BoomboxPage insideBoombox={insideBoombox} setInsideBoombox={setInsideBoombox} setCreatePlaylist={setCreatePlaylist} />} */}

            <BoomboxPage>
                <TracklistFilter query={query} />
                <DispenseAlbumsPage />
            </BoomboxPage>

            {/* <BoomboxPage query={query} /> */}
        </>
    )

    
}