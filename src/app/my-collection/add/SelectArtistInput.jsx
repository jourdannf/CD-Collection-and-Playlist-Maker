"use client";
import { Field } from "@headlessui/react";
import { Label } from "@headlessui/react";
import FilteredSelect from "@/app/components/FilteredSelect";
import ErrorMessage from "@/app/components/ErrorMessage";
import fetchAlbums from "@/lib/utils/fetchAlbums";



export default function SelectArtistInput ({formState, setValue, isSubmitted, ...register}) {
    const artists = [{value: "SOLE", id: 1}];
    
    return (
    <Field>
        <Label className="font-semibold" htmlFor="artist_name">Artist Name</Label>
        <FilteredSelect 
            options={artists} 
            placeholderText={"Artist Name"} 
            name="artist_name"
            addOption
            setValue={setValue}
            isSubmitted={isSubmitted}
            {...register}
        />
        <ErrorMessage>{formState?.errors?.artist_name?.message}</ErrorMessage>

    </Field>
    )
}