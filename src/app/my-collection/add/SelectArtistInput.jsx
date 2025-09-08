"use client";
import { Field } from "@headlessui/react";
import { Label } from "@headlessui/react";
import FilteredSelect from "@/app/components/FilteredSelect";
import fetchAlbums from "@/lib/utils/fetchAlbums";



export default function SelectArtistInput ({control}) {
    const artists = [{value: "SOLE", id: 1}];
    
    return (
    <Field>
        <Label className="font-semibold">Artist Name</Label>
        <FilteredSelect 
            options={artists} 
            placeholderText={"Artist Name"} 
            name="artist_name"
            required
            control={control}
            addOption
        />
    </Field>
    )
}