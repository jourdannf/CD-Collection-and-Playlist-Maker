"use client"
import Track from "./Track";

export default function TrackList ({className, tracks, handleDragEnd, handleDrag, cropped, draggedTrack, setDraggedTrack, ...refs}) {
    let trackRef = refs.ref;

    return (
        <div ref={refs.containerRef} id="tracklist" className={`space-y-5 ${cropped ? "h-[325px] overflow-y-scroll" : ""} ${className}`}>
            {tracks.map((track, i) => {
                if (cropped) {

                    if (i != tracks.length - 1) {
                        console.log(i)
                        trackRef = null;
                    }
                    
                    return (
                        <Track key={track.track_id} ref={trackRef} useDrag handleDrag={handleDrag} handleDragEnd={handleDragEnd} track={track} trackNum={i+1} draggedTrack={draggedTrack} setDraggedTrack={setDraggedTrack} containerRef={refs.containerRef} />
                        
                    )
                }
                
                // return <Track
                //             ref={i == tracks.length - 1 ? refs.ref : null}
                //             key={`track${track.track_id}`} 
                //             track={track} 
                //             trackNum={i+1}
                //             handleDragEnd={handleDragEnd} 
                //             handleDrag={handleDrag} 
                //             useDrag 
                //             containerID="#boomboxPageContainer"
                //         />;
            })}
            
        </div>
    )
}