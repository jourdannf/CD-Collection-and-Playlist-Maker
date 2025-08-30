import InputText from "@/app/components/InputText";
import Album from "@/app/components/Album";
import AlbumCard from "../components/AlbumCard";

export default async function AlbumsPage ({pageNum, albums}) {
    // Fetch 90 albums from the database => 10 pages of albums if I do 9 albums each page
    // When I reach album number 90 fetch the next instance of albums
    // Means that albums shouldn't be fetched in this page but the albums should just be fed to this page

    return (
        <>
            <div className="grid grid-cols-[repeat(3,minmax(260px,1fr))] w-[906px] h-[1101px] mx-auto grid-rows-[repeat(3,minmax(317px,1fr))] gap-x-15.5 gap-y-18.75">
                {albums.map(album => {
                    let size;

                    switch (album.medium) {
                        case "CD":
                            size = 180;
                            break;

                        case "vinyl":
                            size = 230;
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