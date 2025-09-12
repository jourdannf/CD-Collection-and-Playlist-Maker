"use client";

import TrackList from "@/app/components/TrackList";

export default function ScrollableTracklistContainer ({tracks, containerRef, className, setDraggedTrack, trackRef}) {
    
    return (
        <div ref={containerRef} className={`overflow-y-auto ${className ? className : ""}`}>
            <TrackList 
                setDraggedTrack={setDraggedTrack} 
                ref={trackRef} 
                tracks={tracks} 
                containerRef={containerRef} 
                draggable 
            />
        </div>
    )
}