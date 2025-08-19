import InputText from "@/app/components/InputText"
import { Search } from "lucide-react"
import TrackList from "@/app/components/TrackList"

export default function TracklistFilter({inputVal, setInputVal, tracks}) {

    function handleChange(e) {
        setInputVal(e.target.value);
    }
    
    return(
        <>
            <InputText 
                className={`w-96 h-8 mb-11`} 
                placeholder="What song did you want to add?"
                icon={<Search className="absolute top-0" size={17} strokeWidth={3} />}
                variant="startIcon"
                handleChange={handleChange}
            />
            <TrackList className="mx-8" query={inputVal} tracks={tracks} />
        </>
    )
}