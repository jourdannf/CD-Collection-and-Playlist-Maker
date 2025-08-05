import Album from "./Album"
import Ratings from "./Ratings"

export default function MusicLog ({logInfo, imgWidth, imgHeight, type }) {
    return (
        <div className="flex gap-5 mb-8">
            <Album albumInfo={logInfo} width={imgWidth} height={imgHeight} className="self-start" />
            <div>
                <p className="font-semibold">{logInfo?.title}</p>
                <p className="font-normal mb-3">{logInfo?.artist_name}</p>
                <p className="font-normal text-sm mb-3.5">{logInfo?.body}</p>
                <Ratings disabled={true} rating={logInfo?.rating} className="" />
            </div>    
        </div>
    )
}