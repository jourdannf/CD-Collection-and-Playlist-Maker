"use client"
import InputText from "@/app/components/InputText"
import { Search } from "lucide-react"
import TrackList from "@/app/components/TrackList"
import { useState } from "react"

export default function TracklistFilter() {
    const [inputVal, setInputVal] = useState('');

    function handleChange(e) {
        setInputVal(e.target.value);
    }
    
    return(
        <>
            <InputText 
                className={`w-96 h-8`} 
                placeholder="What song did you want to add?"
                icon={<Search className="absolute top-0" size={17} strokeWidth={3} />}
                variant="startIcon"
                handleChange={handleChange}
            />
            <TrackList query={inputVal} />
        </>
    )
}