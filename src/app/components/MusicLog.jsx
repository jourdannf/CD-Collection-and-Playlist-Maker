import fetchAlbum from "@/lib/utils/fetchAlbums"
import Album from "./Album"
import Ratings from "./Ratings"
import { cookies } from "next/headers"

export default async function MusicLog ({logInfo, imgSize, direction, className }) {
    console.log(logInfo.album.title)
    
    const MusicLogStyles = {
        horizontal: {
            className: `flex gap-5 content-center ${className || {}}`
        },
        vertical: {
            className: `relative ${className}` || {}
        }
    }
    
    return (
        <div {...MusicLogStyles[direction]}>
            <Album albumInfo={logInfo.album} variant={imgSize} className="self-start" />
            <div >
                <p className="font-semibold">{logInfo?.album.title}</p>
                <p className="font-normal mb-3">{logInfo?.album.artist_name}</p>
                <p className={`font-normal text-sm mb-3.5 ${direction === "vertical" && `h-18`}`}>{logInfo?.body}</p>
                <Ratings disabled={true} rating={logInfo?.rating} className={`${direction === "vertical" && "justify-self-center "}`} />
            </div>    
        </div>
    )
}