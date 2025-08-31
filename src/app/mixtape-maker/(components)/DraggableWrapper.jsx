"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Track from "@/app/components/Track";

export default function DraggableWrapper({track, trackNum, handleDragEnd, handleDrag, ref}) {
    let dragElem;
    
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
                top: clone.offset,
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
    
    return children();
}