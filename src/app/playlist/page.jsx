"use client"

import TracklistFilter from "./(components)/TracklistFilter"
import Boombox from "./(components)/Boombox"
import { DndContext } from "@dnd-kit/core"


export default function PlaylistMaker () {
    return (
        <DndContext>
        <div className="text-center overflow-y-scroll ">
            <h3 className="text-push-play-blue-900">Let's Make a Custom Playlist</h3>
            <Boombox />
            <p className="text-push-play-charcoal-700 text-base">Drag the songs you like to the boombox and it’ll tell you what CDs you need to create a mix. <br /> Click on the boombox when it’s loaded with all the songs you like.</p>
            <TracklistFilter />
        </div>
        </DndContext>
    )
}