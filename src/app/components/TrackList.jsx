import Track from "./Track";
import DraggableTrackWrapper from "../mixtape-maker/(components)/DraggableTrackWrapper";
import { DraggableTracklistContext } from "@/lib/utils/DraggableTracklistProvider";

export default function TrackList ({className, tracks, handleDragEnd, handleDrag, cropped, draggedTrack, setDraggedTrack, databaseEmpty, ...refs}) {

    // get tracks on your own by calling fetchTracks
    

    return (
        <div ref={refs.containerRef} id="tracklist" className={`space-y-5 ${className}`}>
            {tracks.map((track, i) => {
                if (cropped) {
                    
                    return (
                        <DraggableTrackWrapper key={track.track_id}>
                        <Track ref={i == tracks.length -1 ? refs.ref : null} track={track} trackNum={i+1} />
                        </DraggableTrackWrapper>
                        
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

            {/* <div className="mt-4">{databaseEmpty.valid && databaseEmpty.message} </div> */}
            
        </div>
    )
}