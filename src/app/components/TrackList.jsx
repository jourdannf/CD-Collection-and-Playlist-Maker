"use client"
import Track from "./Track";

export default function TrackList ({className, tracks, handleDragEnd, handleDrag, cropped, draggedTrack, setDraggedTrack, databaseEmpty, ...refs}) {

    return (
        <div ref={refs.containerRef} id="tracklist" className={`space-y-5 ${cropped ? "h-[325px] overflow-y-scroll" : ""} ${className}`}>
            {tracks.map((track, i) => {
                if (cropped) {
                    
                    return (
                        <Track key={track.track_id} ref={i == tracks.length -1 ? refs.ref : null} useDrag handleDrag={handleDrag} handleDragEnd={handleDragEnd} track={track} trackNum={i+1} draggedTrack={draggedTrack} setDraggedTrack={setDraggedTrack} containerRef={refs.containerRef} />
                        
                    )
                }

                
                
                return <Track
                            ref={i == tracks.length - 1 ? refs.ref : null}
                            key={`track${track.track_id}`} 
                            track={track} 
                            trackNum={i+1}
                            handleDragEnd={handleDragEnd} 
                            handleDrag={handleDrag} 
                            useDrag 
                            containerID="#boomboxPageContainer"
                        />;
            })}

            <div className="mt-4">{databaseEmpty.valid && databaseEmpty.message} </div>
            
        </div>
    )
}