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


export default function AddAlbumForm () {
    // const {control, reigster, handleSumbit, formState, reset} = useForm();

    const {control, register, handleSubmit, formState, reset} = useForm({
        resolver: zodResolver(AlbumSchema),
        defaultValues: {
            album_art: "",
            artist_name: ""
        }
    });

    return (
        <Form className="bg-push-play-blue-900/18 rounded-xl pt-7 px-12 relative overflow-hidden pb-15">
            <Fieldset className="space-y-5">
                <Field >
                    <Label className="font-semibold">Album Cover Image</Label>
                    <ImageUplaod name="album_art" />
                </Field>
                <Field>
                    <Label className="font-semibold">Album Title</Label>
                    {/* <FilteredSelect /> */}
                </Field>
                <SelectArtistInput control={control} />
                <Field>
                    <Label className="font-semibold">Release Date</Label>
                    {/* <FilteredSelect /> */}
                </Field>
                <Field>
                    <Label className="font-semibold">Tracks</Label>
                    {/* <FilteredSelect /> */}
                </Field>
            </Fieldset>
            
            <Button variant="primary" className="absolute right-11">Add To Collection</Button>
        </Form>
    )
}