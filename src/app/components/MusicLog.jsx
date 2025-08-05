import Album from "./Album"
import Ratings from "./Ratings"

export default function MusicLog ({albumInfo, imgWidth, imgHeight, type }) {
    return (
        <div>
            <Album albumInfo={albumInfo} width={imgWidth} height={imgHeight} className="float-left" />
            <div>
                <p className="font-semibold">{albumInfo?.title}</p>
                <p className="font-normal">{albumInfo?.body}</p>
                <Ratings disabled={true} rating={albumInfo.rating} className="" />
            </div>
            
        </div>
    )
}