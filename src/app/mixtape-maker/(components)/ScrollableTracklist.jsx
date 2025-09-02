"use client";

import DraggableTrackWrapper from "./DraggableTrackWrapper";
import Track from "@/app/components/Track";
import TrackList from "@/app/components/TrackList";

export default function ScrollableTracklist ({tracks, containerRef, className, setDraggedTrack, trackRef}) {
    
    return (
        <div ref={containerRef} className={`overflow-y-auto ${className ? className : ""}`}>
            <TrackList setDraggedTrack={setDraggedTrack} ref={trackRef} tracks={tracks} containerRef={containerRef} draggable />
        </div>
    )
}