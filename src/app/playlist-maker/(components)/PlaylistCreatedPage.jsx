import StackedCDs from "./StackedCDs"
import Button from "@/app/components/Button"

export default function PlaylistCreatedPage ({insideBoombox}) {
    //insideBoombox is a list of tracks that were inserted inside boombox

    return (
        <div className="text-center content-center h-screen">
            <h4 className="mb-8 hidden">GRAB THESE CDS AND START MIXING</h4>                        
            <StackedCDs insideBoombox={insideBoombox} />
            <Button variant="secondary" className=" mb-2.5 mx-auto hidden">Make Another Mix</Button>
            <Button variant="secondary" className="hidden mx-auto">Add To My Collection</Button>
        </div>
    )
}