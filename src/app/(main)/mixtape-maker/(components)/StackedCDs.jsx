"use client"

import CDSpine from "./CDSpine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function StackedCDs({insideBoombox, dispenseAlbums}) {

    const cdsContainer = useRef();
    useGSAP(() => {
        if (dispenseAlbums) {
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
        
    },{ scope: cdsContainer, revertOnUpdate: true})

    // dependencies:[dispenseAlbums]
    
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