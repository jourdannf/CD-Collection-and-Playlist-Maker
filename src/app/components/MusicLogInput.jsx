"use client"

import Ratings from "./Ratings";
import { Field, Label, Textarea } from "@headlessui/react";
import FilteredSelect from "./FilteredSelect";
import Button from "./Button";
import Form from "next/form"
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { MusicLogSchema } from "@/lib/utils/zodSchemas";
import { createMusicLog } from "../actions";
import ErrorMessage from "./ErrorMessage";


export default function MusicLogInput ({className}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    
    (async () => {
      try {
        const albumsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums`);

        let albums = await albumsRes.json();
        
        albums = albums.map((album) => {
          return {
            id: album.album_id,
            value: `${album.title} - ${album.artist_id}`
          }
        });

        setOptions(albums);

      }catch (e) {
        console.log(e);
        throw e;
      }
    })();
  },[])

  const {control, register, handleSubmit, formState, reset} = useForm({
    resolver: zodResolver(MusicLogSchema),
    defaultValues: {
      album: "",
      rating: 0,
      body: ""
    }
  });

  //In charge of handling the form after submission is complete
  useEffect(() => {
    if (formState.isSubmitSuccessful) {// If submission is complete
      reset(); //Reset the form
    }
  },[formState.isSubmitSuccessful, reset])

  async function onSubmit(values) {
    const result = await createMusicLog(values);

    if (result.status === "error") {
      console.log(result.message)
    }else {
      console.log(result.message)
    }
  }

  return (
      <div className={className ?? ""}>
          <h4 className="mb-7">Create a Music Log</h4>

          <Form onSubmit={handleSubmit(onSubmit)} >
            <Field className="bg-push-play-blue-900/18 rounded-xl pt-7 px-12 relative overflow-hidden">
                <Label className="font-semibold">Album</Label>
                <br/>
                <FilteredSelect 
                  options={options} 
                  placeholderText={"What album are you reviewing?"} 
                  name="album"
                  required
                  control={control}
                />
                <ErrorMessage>{formState.errors.album ? formState.errors.album.message : ""}</ErrorMessage>
                <br />
                <Label> My Rating </Label>
                <br />
                <Ratings name="rating" control={control} />
                <ErrorMessage>{formState.errors.rating ? formState.errors.rating.message : ""}</ErrorMessage>
                <br />
                <Label>My Thougts</Label>
                <br />
                <Textarea {...register("body")} className="w-full h-48 bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl resize-none px-4 py-2 focus:outline-1 focus:drop-shadow-sm focus:drop-shadow-push-play-purple-600 focus:outline-push-play-purple-700 m-0" />
                <ErrorMessage>{formState.errors.body ? formState.errors.body.message : ""}</ErrorMessage>
                <Button 
                    className="float-end mb-6 mt-5.5"
                    variant="primary"
                >
                    Log It
                </Button>
            </Field>
          </Form>
      </div>
  )
}