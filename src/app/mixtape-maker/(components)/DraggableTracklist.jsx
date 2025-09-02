"use client"

import TrackList from "@/app/components/TrackList";
import ScrollableTracklist from "./ScrollableTracklist";
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
                    <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} draggedTrack={draggedTrack} />
                </DraggableTrackWrapper>
                {/* <TrackList containerRef={containerRef} ref={trackRef} tracks={tracks} handleDragEnd={handleDragEnd} handleDrag={handleDrag} cropped className="h-[325px] overflow-y-scroll" setDraggedTrack={setDraggedTrack}/> */}

                <ScrollableTracklist tracks={tracks} containerRef={containerRef} className="h-[325px]" setDraggedTrack={setDraggedTrack} trackRef={trackRef} />
                
            </div>
        </DraggableTracklistProvider>
    )
}