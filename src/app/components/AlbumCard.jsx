import Album from "./Album";

export default function AlbumCard ({albumInfo, width, height, variant}) {

    //type will either be CD or vinyl
    // If CD, the album will be set to the medium variant
    // If vinyl, the album will be set to the large variant

    const size = {
        CD: "medium",
        vinyl: "large"
    }
    
    return (
        <div className={`w-[${width}] h-[${height}] relative `} >
            <div className="py-12 size-[261px]">
                <Album variant={size[variant]} albumInfo={albumInfo} className="mx-auto" />
            </div>

            <div className ={""}>
                <p className="text-lg font-semibold ">{albumInfo?.title}</p>
                <p className="text-lg ">{albumInfo?.artist_name}</p>
            </div>
            
        </div>
    )
}