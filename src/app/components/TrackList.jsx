"use client"
import Track from "./Track";

export default function TrackList ({className, tracks, handleDragEnd, handleDrag, ...refs}) {
    
    return (
        <div ref={refs.containerRef} id="tracklist" className={`grid gap-y-5 ${className}`}>
            {tracks.map((track, i) => {
                return <Track
                            ref={i == tracks.length - 1 ? refs.ref : null}
                            key={`track${track.track_id}`} 
                            trackId={track.track_id} 
                            trackNum={i+1} title={track.title} 
                            length={track.length} 
                            artistName={track.artist_name} 
                            handleDragEnd={handleDragEnd} 
                            handleDrag={handleDrag} 
                            useDrag 
                            containerID="#boomboxPageContainer"
                        />;
            })}
            {/* <div ref={refs.ref}></div> */}
        </div>
    )
}