"use client"

import CDSpine from "./CDSpine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function StackedCDs({insideBoombox, createPlaylist}) {

    const cdsContainer = useRef();
    useGSAP(() => {
        if (createPlaylist) {
            gsap.from('.cd', {
                y: -500,
                duration: 2,
                ease: "bounce.out",
                stagger: {
                    amount: 4,
                    from: "end"
                }
            })
        }
        
    },{dependencies:[createPlaylist], scope: cdsContainer, revertOnUpdate: true})
    
    return (
        <div className="space-y-2 mb-13" ref={cdsContainer}>
            {
                insideBoombox.map((track) => {
                    return <CDSpine key={track.track_id} track={track} />
                })
            }
        </div>
    )
}