"use client"
import { Heart } from "lucide-react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";


//Gap between grid columns will be 16
//Gonna make a template of grids with a min max property

export default function Track({track, trackNum, useDrag, handleDragEnd, handleDrag, className, clone, ref, draggedTrack, setDraggedTrack, containerRef}) {

    let dragElem;
    
    gsap.registerPlugin(Draggable, useGSAP);
    useGSAP(() => { //handling the drag of the clone
        if (clone) {         
            gsap.set(".clone", {
                top: clone.offset
            })

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
                    visibility: "hidden",
                    opactiy: 0
                })
            }

            if (Object.keys(e).length !== 0) {//If there's an intiializing event, start the drag immediately
                dragElem[0].startDrag(clone.event)
                e = {};
            }
            
        }
        
    }, [draggedTrack]);

    const {contextSafe} = useGSAP();

    let handlePress;

    if (!clone) { //handling the intial press of the original element
        handlePress = contextSafe((e) => {

            gsap.set(e.currentTarget, { //make track disapeear
                opacity: 0.8
            });

            gsap.set(".clone", {
                visibility: "visible",
                opacity: 1
            })

            setDraggedTrack({
                track: track,
                trackNum: trackNum,
                offset: e.currentTarget.offsetTop - containerRef.current.scrollTop,
                event: e
            })

        })
    }
    
    
    return (
        <div 
            className={`h-14 bg-push-play-blue-900/12 rounded-lg grid grid-cols-[12px_minmax(250px,_4fr)_minmax(250px,_5fr)_minmax(250px,_1fr)_19px] gap-x-4 text-base px-4 text-push-play-blue-900 hover:cursor-grab track ${className ? className : ""}`}
            data-track-id={track.track_id}
            ref={ref}
            onMouseDown={!clone ? handlePress : null}
        >
            <div className="flex items-center">
                <p>{trackNum}</p>
            </div>
            <div className="text-left flex items-center">
                <p>{track.title}</p>
            </div>
            <div className="text-left flex items-center">
                <p className="">{track.artist_name}</p>
            </div>
            <div className="text-left flex items-center">
                <p>2:00</p>  
            </div>
            <div className="flex items-center justify-self-end">
                <Heart size={19} className="text-push-play-purple-800 fill-push-play-purple-300 hover:fill-push-play-purple-600 hover:cursor-pointer" />
            </div>

        </div>
    )
}