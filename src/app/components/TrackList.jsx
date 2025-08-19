import Track from "./Track";

export default function TrackList ({className, tracks}) {
    
    return (
        <div className={` ${className}`}>
            {tracks.map((track, i) => {
                return <Track key={track.track_id} trackId={track.track_id} trackNum={i+1} title={track.title} length={track.length} artistName={track.artist_name} useDrag />;
            })}
        </div>
    )
}