"use client"
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";

export default function Boombox ({className, handleClick}) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable boombox'
    });

    return (
        <div 
            className={`max-w-[725px] ${className}`}
            ref={setNodeRef}
        >
            <Image className={`hover:cursor-pointer ${isOver ? "drop-shadow-lg drop-shadow-amber-200": ""}`} src="/Boombox.svg" height={478} width={725} alt="Image of a boombox" onClick={handleClick} />
        </div>
    )
}