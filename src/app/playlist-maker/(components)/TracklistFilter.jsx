"use client";

import InputText from "@/app/components/InputText";
import { Search } from "lucide-react";
import TrackList from "@/app/components/TrackList";
import Track from "@/app/components/Track";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function TracklistFilter({setInsideBoombox, insideBoombox}) {
    const [inputVal, setInputVal] = useState('');
    const [tracks, setTracks] = useState([]);
    const [initialResult, setInitialResult] = useState([]);
    const [draggedTrack, setDraggedTrack] = useState(
        {
            track: {},
            trackNum: 0,
            offset: 0,
            event: {}
        }
    );

    const [trackRef, inView, entry] = useInView({threshold: 0.1});
    const containerRef = useRef(null);
    const offset = useRef(1);

    gsap.registerPlugin(useGSAP);

    useEffect(() => {
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=7&search=${inputVal}`;

        if (initialResult.length != 0 && inputVal === '') {
            setTracks(initialResult);
            return;
        }
        
        (async () => {
            const result = await fetch(fetchString);
            const tracksResult = await result.json()
            if (initialResult.length === 0 && inputVal === '') { // no intial result and no input value initializies initial result
                setInitialResult(tracksResult);
            }
            setTracks(tracksResult);
        })();

    }, [inputVal]);

    useEffect(() => {
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=7&search=${inputVal}&offset=${offset}`

        if (inView) {
            (async () => {
                try {
                    const result = await fetch(fetchString);
                    const additionalTracks = await result.json();
                    setTracks([...tracks, additionalTracks]);

                    if (inputVal === '') {
                        setInitialResult([...tracks, additionalTracks]);
                    }

                }catch (e) {
                    throw e;
                }
            })();
        }

        
    },[inView])

    const {contextSafe} = useGSAP();

    function handleDragEnd (e) {
        gsap.to(this.target, {//Changes track color back to normal after drag is over
            backgroundColor: "rgba(0, 31, 92, 0.12)",
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
            gsap.set(".clone", {
                opacity: 0,
                visibility: "hidden",
                x: 0,
                y: 0,
                duration: 0
            })
        }else {// if you end drag outside of boombox and returns to static form
            let tl = gsap.timeline();
            
            tl.to(this.target, {// places the track back
                x: 0,
                y: 0,
                duration: 0
            }).set(".track", {// returns track to static form
                opacity: 1,
                visibility: "visible",
            }).set(".clone", {// hides draggable instance
                opacity: 0,
                visibility: "hidden"
            });

            // gsap.set(".clone", {// hides draggable instance
            //     opacity: 0,
            //     visibility: "hidden"
            // })

            // gsap.set(".track", { // returns track to static form
            //     opacity: 1,
            //     visibility: "visible"
            // })

        }
    
    }

    function handleDrag (e) {

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
    
    //How To Execute Drag and Drop Outside of Scroll Div
    //Create a use state variable that contains infomration about the element being dragged along with it's coordinates
    //Pass this state variable to every track. If the track is being dragged, then the state variable will update upon press
    //When a track is pressed, it will be invisible and the same element will be placed in the outer div that's not hidden using the state variable
    //When the drag is over, the element will ease back into it's intial place, the state variable will be updated to null, and then the former element display will be set to hidden
    
    return(
        <>
            <InputText 
                className={`w-96 h-8 mb-11 `} 
                placeholder="What song did you want to add?"
                icon={<Search className="absolute top-0" size={17} strokeWidth={3} />}
                variant="startIcon"
                handleChange={handleChange}
            />
            <div className="mx-8 relative" >
                {draggedTrack && <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} handleDrag={handleDrag} handleDragEnd={handleDragEnd} draggedTrack={draggedTrack} />}
                <TrackList ref={trackRef} query={inputVal} tracks={tracks} handleDragEnd={handleDragEnd} handleDrag={handleDrag} setDraggedTrack={setDraggedTrack} containerRef={containerRef} cropped />
            </div>
        </>
    )
}