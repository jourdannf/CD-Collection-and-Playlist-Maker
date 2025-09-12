import Track from "./Track";
import DraggableTrackWrapper from "../(main)/mixtape-maker/(components)/DraggableTrackWrapper";

export default function TrackList ({className, tracks, draggable, setDraggedTrack, databaseEmpty, ...refs}) {

    return (
        <div id="tracklist" className={`space-y-5 ${className}`}>
            {tracks.map((track, i) => {
                if (draggable) {
                    
                    return (
                        <DraggableTrackWrapper key={track.track_id} containerRef={refs.containerRef} setDraggedTrack={setDraggedTrack}>
                        <Track ref={i == tracks.length -1 ? refs.ref : null} track={track} trackNum={i+1} className="track" />
                        </DraggableTrackWrapper>
                        
                    )
                }                
                
                return <Track
                            key={`track${track.track_id}`} 
                            track={track} 
                            trackNum={i+1} 
                            useDrag 
                            containerID="#boomboxPageContainer"
                        />;
            })}

            {tracks.length === 0 && "No songs in your collection"}

            {/* <div className="mt-4">{databaseEmpty.valid && databaseEmpty.message} </div> */}
            
        </div>
    )
}