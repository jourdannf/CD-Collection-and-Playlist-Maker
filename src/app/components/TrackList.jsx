"use client"
import { useState, useEffect } from "react";
import Track from "./Track";

export default function TrackList ({inputVal, className}) {
    const [tracks, setTracks] = useState([]); 
    
    useEffect(() => {
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&artist`;

        //Filter via fetch string here
        
        (async () => {
            const result = await fetch(fetchString);
            
            setTracks(await result.json());
        })();
        
    },[inputVal]);
    
    return (
        <div className={` ${className}`}>
            {tracks.map((track, i) => {
                console.log(track)
                return <Track key={track.track_id} trackId={track.track_id} trackNum={i+1} title={track.title} length={track.length} artistName={track.artist_name} />;
            })}
        </div>
    )
}