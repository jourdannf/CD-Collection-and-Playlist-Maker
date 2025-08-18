import TracklistFilter from "./(components)/TracklistFilter"

export default function PlaylistMaker () {
    return (
        <div className="text-center overflow-y-scroll !pl-0">
            <h3 className="text-push-play-blue-900">Let's Make a Custom Playlist</h3>
            <div className="w-[725px] h-[478px] bg-push-play-purple-600"></div>
            <p className="text-push-play-charcoal-700 text-base">Drag the songs you like to the boombox and it’ll tell you what CDs you need to create a mix. <br /> Click on the boombox when it’s loaded with all the songs you like.</p>
            <TracklistFilter />
        </div>
    )
}