
import AlbumsPage from "../../AlbumsPage";
import InputText from "@/app/components/InputText";
import fetchAlbums from "@/lib/utils/fetchAlbums";

export default async function MyCollectionPage ({params}) {

    //When you reach page 10, you need to call for 90 more albums
    // (page_num)%10 = 0 means you need to fetch the next set of albums
    //Every time the page number is divisibile by 10, you should add one to an offset

    const {page_num} = await params;

    let albums = [];

    if (page_num % 10 === 1) {
        //fetch the albums and push onto array
        const limit = 90;
        const offset = albums.length / limit;
        albums.push(...(await fetchAlbums(limit, offset)));
    }

    const start = (page_num - 1) * 10;
    const end = (page_num * 10) - 1;

    const displayedAlbums = albums.slice(start, end);

    return (
        <div className={" mx-auto mt-17"}>
            <InputText placeholder={"What album are you looking for?"} className={"w-[599px] h-10 mb-20"} />
            <AlbumsPage pageNum={page_num} albums={displayedAlbums}/>
        </div>
    )

}