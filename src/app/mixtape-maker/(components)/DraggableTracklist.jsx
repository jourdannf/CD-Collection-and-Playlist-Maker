//Special implementation of a tracklist that's able to drag the tracks out of a scrollable div
"use client"

import ScrollableTracklistContainer from "./ScrollableTracklistContainer";
import Track from "@/app/components/Track";
import DraggableTracklistProvider from "@/lib/utils/DraggableTracklistProvider";
import DraggableTrackWrapper from "./DraggableTrackWrapper";
import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function DraggableTracklist ({tracks, query}) {
    const [trackRef, inView, entry] = useInView({threshold: 0.1});
    const containerRef = useRef(null);
    const [draggedTrack, setDraggedTrack] = useState(
        {
            track: {},
            trackNum: 1,
            offset: 0,
            event: {}
        }
    );
    const [tempTracks, setTempTracks] = useState(tracks);

    useEffect(() => {
        setTempTracks(tracks);
    }, [query]);

    useEffect(() => {
        if (query == ""){
            //We will clear out the boombox when there's no query and the user has refreshed the page to start over
            //Lose progress basically every time you reload the page to it's intial state
            (async () => {
                try {
                    const options = {
                        method: "DELETE"
                    };

                    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/boombox`, options);
                    console.log(result.statusText);

                }catch (e) {
                    throw e;
                }
            })();
        }
        
    }, []);

    return (
        <DraggableTracklistProvider value={draggedTrack}>
            <div className="relative top-11 " >
                <DraggableTrackWrapper setDraggedTrack={setDraggedTrack} containerRef={containerRef} clone={draggedTrack} setTracks={setTempTracks} tracks={tempTracks}>
                    <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} draggedTrack={draggedTrack} /> {/*clone that's dragged outside of scrollable div*/}
                </DraggableTrackWrapper>
                <ScrollableTracklistContainer tracks={tempTracks} containerRef={containerRef} className="h-[325px]" setDraggedTrack={setDraggedTrack} trackRef={trackRef} />
                
            </div>
        </DraggableTracklistProvider>
    )
}