import StackedCDs from "./StackedCDs";
import Button from "@/app/components/Button";


export default function PlaylistCreatedPage ({insideBoombox, createPlaylist}) {
    //insideBoombox is a list of tracks that were inserted inside boombox

    let uniqueAlbums = [];

    insideBoombox = insideBoombox.filter((track, i) => {
        if (uniqueAlbums.includes(track.album_title)) {
            return false;
        }else {
            uniqueAlbums.push(track.album_title);
            return true;
        }
    })

    return (
        <div className="text-center content-center h-screen">
            <h4 className="mb-8 ">GRAB THESE CDS AND START MIXING</h4>
                           
            <StackedCDs insideBoombox={insideBoombox} createPlaylist={createPlaylist} />
            <Button variant="secondary" className=" mb-2.5 mx-auto block">Make Another Mix</Button>
            <Button variant="secondary" className=" mx-auto block">Add To My Collection</Button>
        </div>
    )
}