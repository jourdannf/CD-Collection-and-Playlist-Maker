"use client";

import InputText from "@/app/components/InputText";
import { Search } from "lucide-react";
import TrackList from "@/app/components/TrackList";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

export default function TracklistFilter({setInsideBoombox, insideBoombox}) {
    const [inputVal, setInputVal] = useState('');
    const [tracks, setTracks] = useState([]);
    const [initialResult, setInitialResult] = useState([]);

    const containerRef = useRef(null);

    const [trackRef, inView, entry] = useInView({threshold: 0.1});

    useEffect(() => {
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=7&search=${inputVal}`;

        if (initialResult.length != 0 && inputVal === '') {
            setTracks(initialResult);
            return;
        }
        
        (async () => {
            const result = await fetch(fetchString);
            const tracksResult = await result.json()
            if (initialResult.length === 0 && inputVal === '') {
                setInitialResult(tracksResult);
            }
            setTracks(tracksResult);
        })();

    }, [inputVal]);

    useEffect(() => {
        console.log(`The tracklist div is in view with threshold of 90%: ${inView}`)
    },[inView])

    function handleDragEnd(e) {  
        gsap.to(this.target, {//Changes track color back to normal after drag is over
            backgroundColor: "rgba(0, 31, 92, 0.12)"
        });

        if (this.hitTest("#droppableBoombox")) { // removes track from list 
            setTracks(tracks.filter((track) => {
                if (track.track_id === Number(this.target.dataset.trackId)) {
                    setInsideBoombox([...insideBoombox, track]);
                }

                return track.track_id != this.target.dataset.trackId;
            }));

            gsap.to("#droppableBoombox", {
                rotation: 0,
                duration: 1,
                scale: 1,
                filter: "none"
            })
        }else {
            gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 2,
                ease:'elastic.out(.45)',
            })
        }
    
    }

    function handleDrag (e) {
            gsap.to(this.target, {
                backgroundColor: "rgba(0, 31, 92, 0.4)"
            });

            if(this.hitTest("#droppableBoombox")){
                gsap.to("#droppableBoombox", {
                    rotation: 7,
                    duration: 1,
                    scale: 1.05,
                    filter: "drop-shadow(1px 1px 9px #8c8c8c)",
                    
                })
            }else {
                gsap.to("#droppableBoombox", {
                    rotation: 0,
                    duration: 1,
                    scale: 1,
                    filter: "none"
                })
            }
        }
    
    
    function handleChange(e) {
        setInputVal(e.target.value);
    }

    
    
    return(
        <>
            <InputText 
                className={`w-96 h-8 mb-11 `} 
                placeholder="What song did you want to add?"
                icon={<Search className="absolute top-0" size={17} strokeWidth={3} />}
                variant="startIcon"
                handleChange={handleChange}
            />
            <TrackList ref={trackRef} containerRef={containerRef} className="mx-8 " query={inputVal} tracks={tracks} handleDragEnd={handleDragEnd} handleDrag={handleDrag} />
        </>
    )
}