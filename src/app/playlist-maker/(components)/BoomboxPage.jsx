"use client"

import TracklistFilter from "./TracklistFilter";
import Boombox from "./Boombox";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useEffect, useState } from "react";

export default function BoomboxPage ({setInsideBoombox, insideBoombox, setCreatePlaylist}) {
    const [inputVal, setInputVal] = useState('');
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&artist&date`;

        //Filter via fetch string here
        
        (async () => {
            const result = await fetch(fetchString);

            setTracks(await result.json());
        })();

    }, [inputVal]);

    function handleDragEnd(e) {
        if (e.over) {
            //Find e.over.id in the tracks, provide it to new array and delete it from the list of tracks
            
            setTracks(tracks.filter((track) => {
                if (track.track_id === e.active.id) {
                    setInsideBoombox([...insideBoombox, track]);
                }

                return track.track_id != e.active.id
            }));
        }
    }

    function handleClick(e) {
        if (insideBoombox.length != 0) {
            setCreatePlaylist(true);
        }else {
            //Make component look like something is invalid
        }
        
    }

    return (
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
        <div className="text-center overflow-y-scroll p-13">
            <h3 className="text-push-play-blue-900 mb-12 mt-18">Let's Make a Custom Playlist</h3>
            <Boombox className={"mx-auto mb-7"} handleClick={handleClick} />
            <p className="text-push-play-charcoal-700 text-base mb-14">Drag the songs you like to the boombox and it’ll tell you what CDs you need to create a mix. <br /> Click on the boombox when it’s loaded with all the songs you like.</p>
            <TracklistFilter inputVal={inputVal} setInputVal={setInputVal} tracks={tracks} />
        </div>
        </DndContext>
    )
}