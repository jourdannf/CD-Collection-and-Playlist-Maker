"use client"
import { useState } from "react"

export default function MixtapeMakerClientWrapper ({boomboxPage}) {
    const [insideBoombox, setInsideBoombox] = useState([]);
    const [dispenseAlbums, setDispenseAlbums] = useState(false);

  

   return <>{boomboxPage}</>

    
}