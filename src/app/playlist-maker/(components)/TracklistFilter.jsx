"use client";

import InputText from "@/app/components/InputText";
import { Search } from "lucide-react";
import TrackList from "@/app/components/TrackList";
import Track from "@/app/components/Track";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useInView } from "react-intersection-observer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function TracklistFilter({setInsideBoombox, insideBoombox}) {
    const [search, setSearch] = useState('');
    const [inputVal] = useDebounce(search,200);
    const [tracks, setTracks] = useState([]);
    const [initialResult, setInitialResult] = useState([]);
    const [draggedTrack, setDraggedTrack] = useState(
        {
            track: {},
            trackNum: 1,
            offset: 0,
            event: {}
        }
    );
    const [databaseEmpty, setDatabseEmpty] = useState({valid: false, message: ""});

    const [trackRef, inView, entry] = useInView({threshold: 0.1});
    const containerRef = useRef(null);
    const offset = useRef(1);
    const numberOfItems = 10;

    gsap.registerPlugin(useGSAP);

    useEffect(() => { // deal w search inputs
        
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=${numberOfItems}&search=${inputVal}`;

        if (databaseEmpty.valid) {
            setDatabseEmpty({valid: false, message: ""});
        }
        if (initialResult.length != 0 && inputVal === '') {
            setTracks(initialResult);
            return;
        }
        
        (async () => {
            const result = await fetch(fetchString);
            const tracksResult = await result.json();
            if (initialResult.length === 0 && inputVal === '') { // no intial result and no input value initializies initial result
                setInitialResult(tracksResult);
            }
            setTracks(tracksResult);
        })();

    }, [inputVal]);

    useEffect(() => { // load more on scroll
        let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=${numberOfItems}&search=${inputVal}&offset=${offset.current}`

        if (inView && !databaseEmpty.valid) {// if you're at the last track in the list and there are more songs to load
            (async () => {
                try {
                    const result = await fetch(fetchString);
                    const additionalTracks = await result.json();

                    if (additionalTracks.length !== 0) {
                        setTracks([...tracks, ...additionalTracks]);
                        offset.current += 1;

                        if (inputVal === '') { // no input value adds on to the intial result that should be reverted to if search is empty
                            setInitialResult([...tracks, ...additionalTracks]);
                        }
                    }else {
                        setDatabseEmpty({valid: true, message: "There are no more songs in your collection"})
                    }

                }catch (e) {
                    throw e;
                }
            })();
        }
        
    },[inView])

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

            if (inputVal != "") {
                setTracks(initialResult.filter(track => {
                    console.log(track.track_id !== Number(this.target.dataset.trackId))
                    return track.track_id !== Number(this.target.dataset.trackId)
                }));
                setSearch("");
            }

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
        setSearch(e.target.value);
    }
    
    //How To Execute Drag and Drop Outside of Scroll Div
    //Create a use state variable that contains infomration about the element being dragged along with it's coordinates
    //Pass this state variable to every track. If the track is being dragged, then the state variable will update upon press
    //When a track is pressed, it will be invisible and the same element will be placed in the outer div that's not hidden using the state variable
    //When the drag is over, the element will ease back into it's intial place, the state variable will be updated to null, and then the former element display will be set to hidden
    
    return(
        <div className="relative mx-8">
            <div className="absolute right-0">
                <InputText 
                    className={`w-96 h-8`} 
                    placeholder="What song did you want to add?"
                    icon={<Search  size={17} strokeWidth={2.5} />}
                    variant="startIcon"
                    handleChange={handleChange}
                    inputVal={search}
                />
            </div>
            
            <div className="relative top-11" >
                {draggedTrack && <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} handleDrag={handleDrag} handleDragEnd={handleDragEnd} draggedTrack={draggedTrack} />}
                <TrackList ref={trackRef} tracks={tracks} handleDragEnd={handleDragEnd} handleDrag={handleDrag} setDraggedTrack={setDraggedTrack} containerRef={containerRef} cropped databaseEmpty={databaseEmpty} />
                
            </div>

            
        </div>
    )
}