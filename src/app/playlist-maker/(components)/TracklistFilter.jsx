"use client";

import InputText from "@/app/components/InputText";
import { Search } from "lucide-react";
import TrackList from "@/app/components/TrackList";
import { useState, useEffect } from "react";
import gsap from "gsap";

export default function TracklistFilter({setInsideBoombox, insideBoombox}) {
    const [inputVal, setInputVal] = useState('');
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=7`;

        //Filter via fetch string here
        
        (async () => {
            const result = await fetch(fetchString);

            setTracks(await result.json());
        })();

    }, [inputVal]);

    function handleDragEnd(e) {  
        //Find e.over.id in the tracks, provide it to new array and delete it from the list of tracks

        if (this.hitTest("#droppableBoombox")) {
            setTracks(tracks.filter((track) => {
                if (track.track_id === Number(this.target.dataset.trackId)) {
                    setInsideBoombox([...insideBoombox, track]);
                }

                return track.track_id != this.target.dataset.trackId;
            }));

            gsap.to("#droppableBoombox", {
                rotation: 0,
                duration: 1,
                scale: 1
            })
        }else {
            gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 2,
                ease:'elastic.out(.45)'
            })
        }
    
    }
    
    
    function handleChange(e) {
        setInputVal(e.target.value);
    }

    
    
    return(
        <>
            <InputText 
                className={`w-96 h-8 mb-11`} 
                placeholder="What song did you want to add?"
                icon={<Search className="absolute top-0" size={17} strokeWidth={3} />}
                variant="startIcon"
                handleChange={handleChange}
            />
            <TrackList className="mx-8" query={inputVal} tracks={tracks} handleDragEnd={handleDragEnd} />
        </>
    )
}