import InputText from "@/app/components/InputText";
import Album from "@/app/components/Album";
import AlbumCard from "../components/AlbumCard";

export default async function AlbumsPage ({pageNum}) {


    let albums = [];
    let limit = "9"
    let offset = pageNum-1;
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums?limit=${limit}&offset=${offset}`);
        albums = await result.json();
    }catch (e) {
        throw e;
    }

    return (
        <>

            <div className="grid grid-cols-[repeat(3,minmax(260px,1fr))] w-[906px] h-[1101px] mx-auto grid-rows-[repeat(3,minmax(317px,1fr))] gap-x-15.5 gap-y-18.75">
                {albums.map(album => {
                    let size;

                    switch (album.medium) {
                        case "CD":
                            size = 152;
                            break;

                        case "vinyl":
                            size = 250;
                            break;
                    
                        default:
                            break;
                    }

                    return (
                        <AlbumCard key={album?.album_id} albumInfo={album} size={size} className="mx-auto" width="261px" height="317px" /> 
                    )
                })}
            </div>
        </>
    )
}