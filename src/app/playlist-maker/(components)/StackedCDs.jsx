"use client"

import CDSpine from "./CDSpine"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

gsap.registerPlugin(useGSAP);

export default function StackedCDs({insideBoombox, createPlaylist}) {

    console.log(insideBoombox)
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
        
    },{dependencies:[createPlaylist], revertOnUpdate: true})
    
    return (
        <div className="space-y-2 mb-13">
            {
                insideBoombox.map((track) => {
                    return <CDSpine key={track.track_id} track={track} />
                })
            }
        </div>
    )
}