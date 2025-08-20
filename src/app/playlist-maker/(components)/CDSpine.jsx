"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function CDSpine ({track}) {
    const trackDate = new Date(track.release_date);
    useGSAP(() => {
        gsap.to('.stackedCDs', {
            y: -100,
            duration: 5,
            ease: "elastic.out",
            repeat: -1,
            yoyo: true,
            paused: true
        })
    },[])
    
    return (
        <div className="border-x-8 border-y-6 grid grid-cols-3 px-6 w-[708px] mx-auto bg-push-play-purple-600/50 border-push-play-charcoal-200 text-push-play-charcoal-900 stackedCDs">
            <p className="text-left">{track.artist_name}</p>
            <p className="text-center">{track.title}</p>
            <p className="text-right">{trackDate.getFullYear()}</p>
        </div>
    )
}