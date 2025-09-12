"use client";
import Button from "@/app/components/Button";
import FilteredSelect from "@/app/components/FilteredSelect";
import ImageUplaod from "@/app/components/ImageUpload";
import { Field, Fieldset, Label } from "@headlessui/react";
import Form from "next/form";
import SelectArtistInput from "./SelectArtistInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumSchema } from "@/lib/utils/zodSchemas";
import { useFieldArray, useForm } from "react-hook-form";
import TextInput from "@/app/components/TextInput";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "@/app/components/ErrorMessage";
import * as z from 'zod';



export default function AddAlbumForm () {
    const [trackLength, setTrackLength] = useState(2);
    const currentDate = new Date(Date.now()).toISOString();
    //currentDate.slice(0, currentDate.indexOf("T"))

    const {control, register, unregister, handleSubmit, formState, reset, setValue, getValues} = useForm({
        resolver: zodResolver(AlbumSchema),
        defaultValues: {
            album_art: [""],
            title: "",
            artist_name: "",
            release_date: "",
            tracks: [{value: ""}]
        }
    });

    const {fields, append} = useFieldArray({control, name: "tracks"})

    async function onSubmit (values) {
        //Deal with the file
        //Take the file object and send it to the cdn
        //CDN sends you back the link to the photo
        //Add that link to the body that's being sent to the database
    }

    function onError(e) {
       //Handle showing errors 
       console.log(e)
    }

    function convertErrorsIntoObj (errors) {
        if (!Array.isArray(errors)){
            return errors;
        }

        return Object.assign({}, ...errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} className="bg-push-play-blue-900/18 rounded-xl pt-7 px-12 relative overflow-hidden pb-15" >
            <Fieldset className="space-y-5">
                <Field >
                    <Label className="font-semibold" htmlFor="album_art">Album Cover Image<span className="text-push-play-purple-700">*</span></Label>
                    <ImageUplaod {...register("album_art")} setValue={setValue} getValues={getValues} />
                    <ErrorMessage>{convertErrorsIntoObj(formState?.errors?.album_art)?.message}</ErrorMessage>
                </Field>
                <Field>
                    <Label className="font-semibold" htmlFor="title">Album Title</Label>
                    <TextInput placeholder="Album Title" {...register("title")} />
                    <ErrorMessage>{formState?.errors?.title?.message}</ErrorMessage>
                </Field>
                <SelectArtistInput control={control} formState={formState} setValue={setValue} isSubmitted={formState.isSubmitted} {...register("artist_name", {required: true})} />
                <Field>
                    <Label className="font-semibold" htmlFor="release_date">Release Date</Label>
                    <br></br>
                    <input type="date" className="input w-full pr-3" {...register("release_date")} />
                    <ErrorMessage>{formState?.errors?.release_date?.message}</ErrorMessage>
                </Field>
                <Field className="space-y-1.5"> 
                    <Label className="font-semibold" htmlFor="tracks">Tracks</Label>   
                    {
                        fields.map((field, index) => {
                            
                            return <TextInput key={field.id} {...register(`tracks.${index}.value`)} placeholder={`Track ${index + 1}`} />
                        })
                    }
                    <ErrorMessage>{formState?.errors?.tracks ? "At least one track is required" : ""}</ErrorMessage>
                    <Button variant="primary" handleClick={(e) => { append({value: ""});}}>ADD</Button>
                    
                </Field>
            </Fieldset>

            
            
            <Button type="submit" variant="primary" className="absolute right-11">Add To Collection</Button>
        </Form>
    )
}