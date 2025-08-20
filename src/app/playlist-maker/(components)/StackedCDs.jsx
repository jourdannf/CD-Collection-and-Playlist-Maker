import CDSpine from "./CDSpine"


export default function StackedCDs({insideBoombox}) {
    
    
    return (
        <div className="space-y-2 mb-13">
            {
                insideBoombox.map((track) => {
                    return <CDSpine key={track.track_id} track={track} />
                })
            }
        </div>
    )
}