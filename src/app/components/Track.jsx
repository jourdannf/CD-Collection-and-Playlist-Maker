import { Heart } from "lucide-react"

export default function Track({title, artistName, length, trackNum}) {
    return (
        <div className="w-11/12 h-14 flex bg-push-play-blue-900/12 mb-5">
            <div className="flex ">
                <p>{trackNum}</p>
                <p>{title}</p>
            </div>
            <p>{artistName}</p>
            <div className="flex ">
                <p>{length}</p>
                <Heart size={19} className="text-push-play-purple-800 fill-push-play-purple-300" />
            </div>

        </div>
    )
}