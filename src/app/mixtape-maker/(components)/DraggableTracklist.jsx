"use client"

import TrackList from "@/app/components/TrackList";
import Track from "@/app/components/Track";
import DraggableTracklistProvider from "@/lib/utils/DraggableTracklistProvider";
import DraggableTrackWrapper from "./DraggableTrackWrapper";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export default function DraggableTracklist ({tracks, handleDrag, handleDragEnd, containerRef}) {
    const [trackRef, inView, entry] = useInView({threshold: 0.1});
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
            <div className="relative top-11" >
                <DraggableTrackWrapper setDraggedTrack={setDraggedTrack}>
                    <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} draggedTrack={draggedTrack} />
                </DraggableTrackWrapper>
                <TrackList ref={trackRef} tracks={tracks} handleDragEnd={handleDragEnd} handleDrag={handleDrag} cropped className="h-[325px] overflow-y-scroll" />
                
            </div>
        </DraggableTracklistProvider>
    )
}