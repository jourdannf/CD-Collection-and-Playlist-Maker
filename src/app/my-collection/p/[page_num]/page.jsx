
import AlbumsPage from "../../AlbumsPage";
import InputText from "@/app/components/InputText";
import fetchAlbums from "@/lib/utils/fetchAlbums";

export default async function MyCollectionPage ({params, searchParams}) {
    const {page_num} = await params;
    const query = (await searchParams)?.query || "";

    let albums = [];
    const limit = 90;
    const offset = albums.length / limit; 

    if (page_num % 10 === 1) {
        //fetch the albums and push onto array
        albums.push(...(await fetchAlbums(limit, offset, query)));
    }

    const start = (page_num - 1) * 10;
    const end = (page_num * 10) - 1;

    const displayedAlbums = albums.slice(start, end);

    return (
        <div className={" mx-auto mt-17"}>
            <InputText placeholder={"What album are you looking for?"} className={"w-[599px] h-10 mb-20"} />
            <AlbumsPage  pageNum={page_num} albums={displayedAlbums}/>
        </div>
    )

}