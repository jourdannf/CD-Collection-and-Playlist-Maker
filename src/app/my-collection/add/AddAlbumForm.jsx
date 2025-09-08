"use client";
import Button from "@/app/components/Button";
import FilteredSelect from "@/app/components/FilteredSelect";
import ImageUplaod from "@/app/components/ImageUpload";
import { Field, Fieldset, Label } from "@headlessui/react";
import Form from "next/form";
import SelectArtistInput from "./SelectArtistInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumSchema } from "@/lib/utils/zodSchemas";
import { useForm } from "react-hook-form";
import TextInput from "@/app/components/TextInput";
import { useState } from "react";



export default function AddAlbumForm () {
    const [trackLength, setTrackLength] = useState(2);
    const currentDate = new Date(Date.now()).toISOString();

    const {control, register, handleSubmit, formState, reset} = useForm({
        resolver: zodResolver(AlbumSchema),
        defaultValues: {
            album_art: "",
            title: "",
            artist_name: "",
            release_date: currentDate.slice(0, currentDate.indexOf("T")),
            tracks: []
        }
    });

    function onSubmit (values) {
        console.log(values);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="bg-push-play-blue-900/18 rounded-xl pt-7 px-12 relative overflow-hidden pb-15" >
            <Fieldset className="space-y-5">
                <Field >
                    <Label className="font-semibold" htmlFor="album_art">Album Cover Image</Label>
                    <ImageUplaod name="album_art" required register={register} />
                </Field>
                <Field>
                    <Label className="font-semibold" htmlFor="title">Album Title</Label>
                    <TextInput placeholder="Album Title" name="title" />
                </Field>
                <SelectArtistInput control={control} />
                <Field>
                    <Label className="font-semibold" htmlFor="release_date">Release Date</Label>
                    <br></br>
                    <input type="date" className="input w-full pr-3" name="release_date" {...register("release_date")} />
                </Field>
                <Field className="space-y-1.5">
                    <Label className="font-semibold" htmlFor="tracks">Tracks</Label>                    
                    {
                        //Create array out of tracklength and use that to genereate the textinputs
                        [...Array(trackLength).keys()].map((i) => {
                            return <TextInput key={`track${i+1}`} placeholder={`Track ${i + 1}`} name="tracks" {...register(`tracks.${i}`)} />
                        })
                    }

                    <Button variant="primary" handleClick={(e) => setTrackLength(trackLength + 1)}>ADD</Button>
                </Field>
            </Fieldset>

            
            
            <Button type="submit" variant="primary" className="absolute right-11">Add To Collection</Button>
        </Form>
    )
}