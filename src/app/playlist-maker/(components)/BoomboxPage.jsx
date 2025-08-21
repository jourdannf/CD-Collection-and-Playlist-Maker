"use client"

import TracklistFilter from "./TracklistFilter";
import Boombox from "./Boombox";

export default function BoomboxPage ({setInsideBoombox, insideBoombox, setCreatePlaylist}) {
    

    function handleClick(e) {
        console.log(insideBoombox)
        if (insideBoombox.length != 0) {
            setCreatePlaylist(true);
        }else {
            //Make component look like something is invalid
        }
        
    }

    return (
        <div className="text-center overflow-y-scroll p-13">
            <h3 className="text-push-play-blue-900 mb-12 mt-18">Let's Make a Custom Playlist</h3>
            <Boombox className={"flex justify-center mb-7"} handleClick={handleClick} />
            <p className="text-push-play-charcoal-700 text-base mb-14">Drag the songs you like to the boombox and it’ll tell you what CDs you need to create a mix. <br /> Click on the boombox when it’s loaded with all the songs you like.</p>
            <TracklistFilter setInsideBoombox={setInsideBoombox} insideBoombox={insideBoombox} />
        </div>
    )
}