import CDSpine from "./CDSpine";

export default function StackedCDs({insideBoombox}) {
    // const trackDate = new Date(track.release_date);
    
    return (
        <div className="space-y-2 mb-13">
        {
            insideBoombox.map((track) => {
                return <CDSpine track={track} />
            })
        }
        </div>
    )
}