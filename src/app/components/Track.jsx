"use client"
import { Heart } from "lucide-react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

//Gap between grid columns will be 16
//Gonna make a template of grids with a min max property

export default function Track({trackId, title, artistName, length, trackNum, useDrag, handleDragEnd, handleDrag, containerID, ref}) {
    let attr = {className: `h-14 bg-push-play-blue-900/12 w-full rounded-lg grid grid-cols-[12px_minmax(250px,_4fr)_minmax(250px,_5fr)_minmax(250px,_1fr)_19px] gap-x-4 text-base px-4 text-push-play-blue-900 track `};


    gsap.registerPlugin(Draggable, useGSAP);
    useGSAP(() => {
        if (useDrag) {
            Draggable.create(".track", {
                onDrag: handleDrag,
                onDragEnd: handleDragEnd,
                bounds: containerID
            });
        }
    });
    
    return (
        <div 
            {...attr}
            data-track-id={trackId}
            ref={ref}
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