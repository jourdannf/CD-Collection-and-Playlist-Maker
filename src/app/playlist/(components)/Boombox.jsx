"use client"
import { useDroppable } from "@dnd-kit/core";

export default function Boombox () {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable boombox'
    });

    return (
        <div 
            className="w-[725px] h-[478px] bg-push-play-purple-600"
            ref={setNodeRef}
        >

        </div>
    )
}