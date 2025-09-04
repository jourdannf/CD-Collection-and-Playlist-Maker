"use client"

// import TracklistFilter from "./TracklistFilter";
import Boombox from "./Boombox";
import DispenseAlbumsPage from "./DispenseAlbumsPage";
import { useState, useContext } from "react";
import { InsideBoomboxContext } from "@/lib/utils/InsideBoomboxProvider";

export default function BoomboxPage ({children, insideBoomboxData}) {
    
    const [dispenseAlbums, setDispenseAlbums] = useState(false);
    const [insideBoombox, setInsideBoombox] = useState(insideBoomboxData);
    const updateInsideBoombox = (value) => {
        setInsideBoombox(value);
    }
    // function handleClick(e) {
    //     if (insideBoombox.length != 0) {
    //         setCreatePlaylist(true);
    //     }else {
    //         //Make component look like something is invalid
    //     }
        
    // }

    //Make boombox dependent on dispense state variable
    //Make children appear and disappear on state variable
    //Only have to deal with passing along inside boombox 

   //import dispense albums as a client component so that i can get the things it needs to the stacked cds

    return (
        <InsideBoomboxContext value={{insideBoombox, updateInsideBoombox}}>
            <div id="boomboxPageContainer" className="text-center px-13 ">
                {!dispenseAlbums && <>
                <h3 className="text-push-play-blue-900 mb-12 mt-18">Let's Make a Custom Playlist</h3>
                <Boombox className={"flex justify-center mb-7"} setDispenseAlbums={setDispenseAlbums} insideBoombox={insideBoombox} />
                <p className="text-push-play-charcoal-700 text-base mb-14">Drag the songs you like to the boombox and it’ll tell you what CDs you need to create a mix. <br /> Click on the boombox when it’s loaded with all the songs you like.</p>
                {children}
                </>}
                {dispenseAlbums && <DispenseAlbumsPage dispenseAlbums={dispenseAlbums} />}
            </div>
        </InsideBoomboxContext>
    )
    

}