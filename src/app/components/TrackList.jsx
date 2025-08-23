import Track from "./Track";

export default function TrackList ({className, tracks, handleDragEnd, handleDrag }) {
    
    return (
        <div id="tracklist" className={`overflow-y-scroll ${className}`}>
            {tracks.map((track, i) => {
                return <Track key={track.track_id} trackId={track.track_id} trackNum={i+1} title={track.title} length={track.length} artistName={track.artist_name} handleDragEnd={handleDragEnd} handleDrag={handleDrag} useDrag containerID="#boomboxPageContainer" />;
            })}
        </div>
    )
}