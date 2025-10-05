"use client"

import StackedCDs from "./StackedCDs";
import Button from "@/app/components/Button";
import { useContext } from "react";
import { InsideBoomboxContext } from "@/lib/utils/contexts";
import { redirect } from "next/navigation";

export default function DispenseAlbumsPage ({dispenseAlbums}) {
    //insideBoombox is a list of tracks that were inserted inside boombox
    let uniqueAlbums = [];

    let {insideBoombox} = useContext(InsideBoomboxContext);

    //Filter what's inside the boombox so that only a unique set of albums are generated
    insideBoombox = insideBoombox.filter((track, i) => {
        if (uniqueAlbums.includes(track.album_title)) {
            return false;
        }else {
            uniqueAlbums.push(track.album_title);
            return true;
        }
    })

    return (
        <div className="text-center content-center h-screen">
            <h4 className="mb-8 ">GRAB THESE CDS AND START MIXING</h4>
                           
            <StackedCDs insideBoombox={insideBoombox} dispenseAlbums={dispenseAlbums} />
            <Button variant="secondary" className=" mb-2.5 mx-auto block" handleClick={() => {redirect('/mixtape-maker')}}>Make Another Mix</Button> 
            <Button variant="secondary" className=" mx-auto block">Add To My Collection</Button>
        </div>
    )
}