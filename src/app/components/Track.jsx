"use client"
import { Heart } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

//Gap between grid columns will be 16
//Gonna make a template of grids with a min max property

export default function Track({trackId, title, artistName, length, trackNum, useDrag}) {
    let attr = {className: `h-14 bg-push-play-blue-900/12 mb-5 w-full rounded-lg grid grid-cols-[12px_minmax(250px,_4fr)_minmax(250px,_5fr)_minmax(250px,_1fr)_19px] gap-4 text-base px-4 [&>*]:text-push-play-blue-900 track`};

    // if (useDrag) {
    //     const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    //         id: trackId
    //     })

    //     const style = transform ? {
    //         transform: `translate(${transform.x}px, ${transform.y}px)`
    //     } : undefined;

    //     attr = {
    //         className: `h-14 bg-push-play-blue-900/12 mb-5 w-full rounded-lg grid grid-cols-[12px_minmax(250px,_4fr)_minmax(250px,_5fr)_minmax(250px,_1fr)_19px] gap-4 text-base px-4 [&>*]:text-push-play-blue-900 hover:cursor-pointer ${isDragging ? 'bg-push-play-blue-900/30' : ""}`,
    //         ref: setNodeRef,
    //         style: style,
    //         ...listeners,
    //         ...attributes
    //     };
    // }


    gsap.registerPlugin(Draggable, useGSAP);
    useGSAP(() => {
        function handleDrag (e) {
            if(this.hitTest("#droppableBoombox")){
                gsap.to("#droppableBoombox", {
                    rotation: 7,
                    duration: 1,
                    scale: 1.05
                })
            }else {
                gsap.to("#droppableBoombox", {
                    rotation: 0,
                    duration: 1,
                    scale: 1
                })
            }
        }

        function handleDragEnd (e) {
            if (this.hitTest("#droppableBoombox")) {
                
            }else {
                gsap.to(this.target, {
                    x: 0,
                    y: 0,
                    duration: 2,
                    ease:'elastic.out(.45)'
                })
            }
        }

        if (useDrag) {
            Draggable.create(".track", {
                onDrag: handleDrag,
                onDragEnd: handleDragEnd
            });
        }
    })
    
    return (
        <div 
            {...attr}
        >
            <div className="flex items-center">
                <p>{trackNum}</p>
            </div>
            <div className="text-left flex items-center">
                <p>{title}</p>
            </div>
            <div className="text-left flex items-center">
                <p className="">{artistName}</p>
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