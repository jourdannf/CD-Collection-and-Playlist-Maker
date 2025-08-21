"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";


import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";


gsap.registerPlugin(Observer, useGSAP);

export default function Boombox ({className, handleClick, moveBoombox}) {
    const {isOver, setNodeRef, node} = useDroppable({
        id: 'droppable boombox'
    });

    // const {contextSafe} = useGSAP(() => {
    //     function hoverBoombox() {
    //         console.log("HERE")
            
    //         if (isOver) {
    //             gsap.to(node.current, {
    //                 rotation: 7,
    //                 duration: 0.2
    //             });
    //         }
            
    //     }

    //     // Observer.create({
    //     //     target: ".cd",
    //     //     onHover: () => {console.log("Here I am")}
    //     // });
    // }, {dependencies:[isOver]});

    
    

    return (
        <div 
            className={className}
            ref={setNodeRef}
        >
            <Image id="droppableBoombox" className={`hover:cursor-pointer ${false ? "drop-shadow-lg drop-shadow-amber-200": ""}`} src="/Boombox.svg" height={329} width={500} alt="Image of a boombox" onClick={handleClick} />
        </div>
    )
}