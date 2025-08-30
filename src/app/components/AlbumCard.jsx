import Album from "./Album";

export default function AlbumCard ({albumInfo, width, height, size}) {
    
    return (
        <div className={`w-[${width}] h-[${height}] relative `} >
            <div className="py-12 size-[261px]">
                <Album albumInfo={albumInfo} width={size} height={size} className="mx-auto" />
            </div>

            <div className ={""}>
                <p className="text-lg font-semibold mt-2">{albumInfo?.title}</p>
                <p className="text-lg ">{albumInfo?.artist_name}</p>
            </div>
            
        </div>
    )
}