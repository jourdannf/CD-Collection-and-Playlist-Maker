//Provides use client functionality needed to allow a track to be dragged - specifically for outside of a scrollable div
"use client";

import { useContext } from "react";
import { DraggableTracklistContext } from "@/lib/utils/DraggableTracklistProvider";
import { InsideBoomboxContext, useUserContext } from "@/lib/utils/contexts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";

//we will use context in order to get the dragged track and it's updater function
// Draggable Wrapper turns tracks into draggable tracks
// Update in the future: Get rid of use context and make it redux instead bc otherwise each track will repaint when only one needs to on dragged track changing

export default function DraggableTrackWrapper({children, setDraggedTrack, ref, clone, containerRef, setTracks, tracks}) {
    let dragElem;
    let draggedTrack = useContext(DraggableTracklistContext);
    let {user} = useUserContext();
    let {insideBoombox, updateInsideBoombox} = useContext(InsideBoomboxContext);
    
    gsap.registerPlugin(Draggable, useGSAP);
    useGSAP(() => { //handling the drag of the clone
        if (clone) {   

            dragElem = Draggable.create(".clone", {
                onDragStart: () => {
                    gsap.to(".clone", {
                        backgroundColor: "rgba(0, 31, 92, 0.4)",
                        duration: 0.2
                    });
                },
                onDrag: handleDrag,
                onDragEnd: handleDragEnd,
            })

            let e = clone.event;
            let track = draggedTrack.track

            if (Object.keys(track).length === 0) {
                gsap.set(".clone", {
                    visibility: "hidden"
                })
            }else {
                gsap.set(".clone", {
                top: draggedTrack.offset,
            })
            }

            

            if (Object.keys(e).length !== 0) {//If there's an intiializing event, start the drag immediately
                dragElem[0].startDrag(draggedTrack.event)
                e = {};
            }
            
        }
        
    }, [draggedTrack]);
    const {contextSafe} = useGSAP();

    let handlePress;

    if (!clone) { //handling the intial press of the original div
        
        handlePress = contextSafe((e) => {

            gsap.set(e.currentTarget, { //make track disapeear
                opacity: 0.8
            });

            gsap.set(".clone", {
                visibility: "visible",
                opacity: 1
            });

            setDraggedTrack({
                track: children.props.track,
                trackNum: children.props.trackNum,
                offset: e.currentTarget.offsetTop - containerRef.current.scrollTop,
                event: e
            })

        })
    }

    function handleDragEnd (e) { 
        gsap.to(this.target, {//Changes track color back to normal after drag is over
            backgroundColor: "rgba(0, 31, 92, 0.12)",
        });

        if (this.hitTest("#droppableBoombox")) { // removes track from list 
            (async () => { // Adds track to inside of boombox
                
                try {
                    
                    const options = {
                        method: "POST",
                        body: JSON.stringify({track_id: Number(this.target.dataset.trackId)}),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": 'application/json'
                        }
                    }
                    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${user.id}/boombox`, options);
                    console.log(result)
                }catch (e) {
                    throw e;
                }
            })();
            
            setTracks(tracks.filter((track) => {
                if (track.track_id === Number(this.target.dataset.trackId)) {
                    updateInsideBoombox([...insideBoombox, track]);
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
    
    return <div ref={ref} onMouseDown={!clone ? handlePress : null} className="hover:cursor-grab" >{children}</div>
}