
import AlbumsPage from "../../AlbumsPage";
import SearchInput from "@/app/components/SearchInput";
import {fetchAlbums} from "@/lib/utils/fetchAlbums";
import Button from "@/app/components/Button";
import { Plus } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

export default async function MyCollectionPage ({params, searchParams}) {
    const {page_num} = await params;
    const query = (await searchParams)?.query || "";

    let albums = [];
    const limit = 90;
    const offset = albums.length / limit; 

    if (page_num % 10 === 1) {
        //fetch the albums and push onto array
        const data = await fetchAlbums(limit, offset, query)
        albums.push(...data);
    }

    const start = (page_num - 1) * 10;
    const end = (page_num * 10) - 1;

    const displayedAlbums = albums.slice(start, end);

    async function handleClick(e) {
        "use server";
        redirect("../../add", RedirectType.push);
    }

    return (
        <div className={" mx-auto mt-17 relative"}>
            <SearchInput placeholder={"What album are you looking for?"} className={"w-[599px] h-10 mb-20 mx-auto"} />
            <AlbumsPage  pageNum={page_num} albums={displayedAlbums}/>
            <div className="absolute right-6">
                <Button variant="primary" className="sticky" handleClick={handleClick}>
                    <Plus />
                </Button>
            </div>
        </div>
    )

}