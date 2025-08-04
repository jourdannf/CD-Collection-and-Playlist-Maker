import Ratings from "./Ratings"

export default function SpeechBubble ({albumInfo}) {
    
    const clipPathByPos = {
        center: "before:left-31 before:clip-path"
    }

    let reviewBody = albumInfo?.body;

    if (reviewBody && reviewBody.length > 80) {
        reviewBody = reviewBody.substring(0, 77) + "...";
    }

    return (
        <div className={`relative text-base w-80 h-44 bg-push-play-charcoal-50 rounded-sm px-5 pt-4 drop-shadow-md drop-shadow-push-play-charcoal-600 before:content-[''] before:absolute before:w-12 before:h-12 before:bg-push-play-charcoal-50 before:-top-9 before:left-31 before:clip-path`}>
            <p className="font-semibold text-lg/[120%]">{albumInfo?.title}</p>
            <p className="text-lg/[120%] mb-2">{albumInfo?.artist_name}</p>
            <p className="text-base/[120%]">{reviewBody}</p>
            <Ratings disabled={true} rating={albumInfo?.rating} className="absolute bottom-8.5" />
            <br/>
            <a href="" className="text-push-play-purple-800 hover:underline block right-7 bottom-3.5 absolute">Review it again</a>
        </div>
    )
}