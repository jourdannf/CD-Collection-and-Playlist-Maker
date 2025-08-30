
import AlbumsPage from "../../AlbumsPage";
import InputText from "@/app/components/InputText";

export default async function MyCollectionPage ({params}) {

    //Get the slug for the page number
    //Feed it to the albums page
    //Pagination will update the slug?

    const {page_num} = await params;

    return (
        <div className={" mx-auto mt-17"}>
            <InputText placeholder={"What album are you looking for?"} className={"w-[599px] h-10 mb-43"} />
            <AlbumsPage pageNum={page_num}/>
        </div>
    )

}