
import DraggableTracklist from "./DraggableTracklist";
import { fetchTracksFilter } from "@/lib/utils/fetchTracks";
import SearchInput from "@/app/components/SearchInput";
import { Search } from "lucide-react";
import { getUserBySession } from "@/auth/core/session";
import { cookies } from "next/headers";

//Will change into a server component so that I can call a function to fetch albums here

//Input Text will handle it's own input on change and update the search query in the link and that will be captured via serach params and fed into the filter

export default async function TracklistFilter({query, filterBoombox}) {
    
    //How To Execute Drag and Drop Outside of Scroll Div
    //Create a use state variable that contains infomration about the element being dragged along with it's coordinates
    //Pass this state variable to every track. If the track is being dragged, then the state variable will update upon press
    //When a track is pressed, it will be invisible and the same element will be placed in the outer div that's not hidden using the state variable
    //When the drag is over, the element will ease back into it's intial place, the state variable will be updated to null, and then the former element display will be set to hidden
    let tracks = [];
    const limit = 35;
    const offset = tracks.length/limit;
    // const {user_id} = await getUserBySession();
    
    tracks = await fetchTracksFilter(query, limit, offset, await cookies(), filterBoombox); //fetch the tracks to be displayed
    
    return(
        
        <div className="relative mx-8">
            <div className="absolute right-0">
                <SearchInput 
                    className={`w-96 h-8`} 
                    placeholder="What song did you want to add?"
                    icon={<Search  size={17} strokeWidth={2.5} />}
                    variant="startIcon"
                    id="boomboxSearch"
                />
            </div>

            <DraggableTracklist tracks={tracks} query={query} /> 

            
        </div>
    )
}