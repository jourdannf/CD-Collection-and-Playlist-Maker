import Ratings from "./Ratings";
import { Field, Label, Textarea } from "@headlessui/react";
import FilteredSelect from "./FilteredSelect";
import Button from "./Button";
import Form from "next/form"
import { createMusicLog } from "@/lib/utils";



export default async function MusicLogInput ({className}) {

    let options = [];

    const opts = {
      method: "GET"
    }

    try {
      const albumsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums`, opts);

    
      let albums = await albumsRes.json();
      
      options = albums.map((album) => {
        return {
          id: album.album_id,
          value: `${album.title} - ${album.artist_id}`
        }
      });

    }catch (e) {
      console.log(e);
      throw e;
    }

    return (
        <div className={className ?? ""}>
            <h4 className="mb-7">Create a Music Log</h4>

            <Form action={createMusicLog} >
              <Field className="bg-push-play-blue-900/18 rounded-xl pt-7 px-12 relative overflow-hidden">
                  <Label className="font-semibold">Album</Label>
                  <br/>
                  <FilteredSelect options={options} placeholderText={"What album are you reviewing?"} name="album" required />
                  <br />
                  <Label> My Rating </Label>
                  <br />
                  <Ratings name="rating" required />
                  <br />
                  <Label>My Thougts</Label>
                  <br />
                  <Textarea name="body" className="w-full h-48 bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl resize-none px-4 py-2 mb-5.5" required />
                  <Button 
                      className="float-end mb-6"
                      variant="primary"
                  >
                      Log It
                  </Button>
              </Field>
            </Form>
        </div>
    )
}