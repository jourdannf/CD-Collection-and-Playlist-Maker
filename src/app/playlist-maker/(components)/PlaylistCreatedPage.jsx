import StackedCD from "./StackedCD"

export default function PlaylistCreatedPage ({insideBoombox}) {
    //insideBoombox is a list of tracks that were inserted inside boombox

    return (
        <div>
            {insideBoombox.map((track) => {
                console.log(track)
                return <StackedCD key={track.track_id} track={track}/>
            })}
        </div>
    )
}