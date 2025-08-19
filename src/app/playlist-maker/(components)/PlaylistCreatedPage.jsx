import StackedCDs from "./StackedCDs"
import Button from "@/app/components/Button"

export default function PlaylistCreatedPage ({insideBoombox}) {
    //insideBoombox is a list of tracks that were inserted inside boombox

    return (
        <div className="text-center content-center h-screen">
            <h4 className="mb-8">GRAB THESE CDS AND START MIXING</h4>
            <div className="space-y-2 mb-13">
            {insideBoombox.map((track) => {
                console.log(track)
                return <StackedCDs key={track.track_id} track={track}/>
            })}
            </div>
            <Button variant="secondary" className="block mb-2.5 mx-auto">Make Another Mix</Button>
            <Button variant="secondary" className="block mx-auto">Add To My Collection</Button>
        </div>
    )
}