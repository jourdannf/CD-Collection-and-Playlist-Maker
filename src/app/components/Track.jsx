"use client"
import { Heart } from "lucide-react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";


//Gap between grid columns will be 16
//Gonna make a template of grids with a min max property

//Turning this into a server component that will remain statuc and only turn draggable when it's wraped by a function

export default function Track({track, trackNum, useDrag, handleDragEnd, handleDrag, className, clone, ref, draggedTrack, setDraggedTrack, containerRef}) {
    
    return (
        <div 
            className={`h-14 bg-push-play-blue-900/12 rounded-lg grid grid-cols-[12px_minmax(250px,_4fr)_minmax(250px,_5fr)_minmax(250px,_1fr)_19px] gap-x-4 text-base px-4 text-push-play-blue-900 ${className || ""}`}
            data-track-id={track.track_id}
            ref={ref}
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