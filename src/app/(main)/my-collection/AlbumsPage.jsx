import Album from "@/app/components/Album";
import AlbumCard from "../../components/AlbumCard";

export default async function AlbumsPage ({pageNum, albums}) {
    // feed all the params and functions here and make this a server component

    return (
        <>
            <div className="grid grid-cols-[repeat(3,minmax(260px,1fr))] w-[906px] mx-auto grid-rows-[minmax(317px,1fr)] gap-x-15.5 gap-y-18.75">
                {albums.map(album => {

                    return (
                        <AlbumCard key={album?.album_id} albumInfo={album} variant={album.medium} className="mx-auto" width="261px" height="317px" /> 
                    )
                })}
            </div>
        </>
    )
}