//Special implementation of a tracklist that's able to drag the tracks out of a scrollable div
"use client"

import ScrollableTracklistContainer from "./ScrollableTracklistContainer";
import Track from "@/app/components/Track";
import DraggableTracklistProvider from "@/lib/utils/DraggableTracklistProvider";
import DraggableTrackWrapper from "./DraggableTrackWrapper";
import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function DraggableTracklist ({tracks, ...props}) {
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

    return (
        <DraggableTracklistProvider value={draggedTrack}>
            <div className="relative top-11 " >
                <DraggableTrackWrapper setDraggedTrack={setDraggedTrack} containerRef={containerRef} clone={draggedTrack}>
                    <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} draggedTrack={draggedTrack} /> {/*clone that's dragged outside of scrollable div*/}
                </DraggableTrackWrapper>
                <ScrollableTracklistContainer tracks={tracks} containerRef={containerRef} className="h-[325px]" setDraggedTrack={setDraggedTrack} trackRef={trackRef} />
                
            </div>
        </DraggableTracklistProvider>
    )
}