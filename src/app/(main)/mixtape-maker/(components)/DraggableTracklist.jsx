//Special implementation of a tracklist that's able to drag the tracks out of a scrollable div
"use client"

import ScrollableTracklistContainer from "./ScrollableTracklistContainer";
import Track from "@/app/components/Track";
import DraggableTracklistProvider from "@/lib/utils/DraggableTracklistProvider";
import DraggableTrackWrapper from "./DraggableTrackWrapper";
import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUserContext } from "@/lib/utils/contexts";
import { fetchTracksFilter } from "@/lib/utils/fetchTracks";
import { useRouter } from "next/navigation";

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
    const [isLoading, setIsLoading] = useState(true);
    const [t, setT] = useState(null);
    const router = useRouter();
    
    useEffect(() => {

        if (query == ""){
            //We will clear out the boombox when there's no query and the user has refreshed the page to start over
            //Lose progress basically every time you reload the page to it's intial state
            // (async () => {
            //     // if (!user) return;

            //     try {
            //         const options = {
            //             method: "DELETE"
            //         };

            //         await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${17}/boombox`, options);

            //         //refetch for the database
            //         //setTempTracks ot what your receive

            //         setT(await fetchTracksFilter('', 35, 0));
                    
            //         setIsLoading(false);
                    
            //     }catch (e) {
            //         throw e;
            //     }
            // })();
        }
        
    }, []);

    tracks = (t || tracks); // if we're past the inital event we need to set t back to null somehow?


    return (
        
        <DraggableTracklistProvider value={draggedTrack}>
            <div className="relative top-11 " >
                <DraggableTrackWrapper setDraggedTrack={setDraggedTrack} containerRef={containerRef} clone={draggedTrack} setTracks={setTempTracks} tracks={tempTracks}>
                    <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} draggedTrack={draggedTrack} /> {/*clone that's dragged outside of scrollable div*/}
                </DraggableTrackWrapper>
                <ScrollableTracklistContainer tracks={tracks} containerRef={containerRef} className="h-[325px]" setDraggedTrack={setDraggedTrack} trackRef={trackRef} />
                
            </div>
        </DraggableTracklistProvider>
    )
}