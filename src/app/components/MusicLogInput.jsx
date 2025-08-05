import { configDotenv } from "dotenv";
import Ratings from "./Ratings";
import { Field, Label, Textarea } from "@headlessui/react";
import FilteredSelect from "./FilteredSelect";
import Button from "./Button";


export default async function MusicLogInput ({className}) {
    let options = [];
    let recentPlays = [];
    
    const opts = {
        method: "GET"
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/history`, opts);
        const resArray = await res.json();
  
        recentPlays = resArray;
  
        const albumsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums`, opts);
        options = await albumsRes.json();
  
      }catch (e) {
        console.log(e);
        throw e;
      }
      
    
  
    options = options.map((album, i) => {
      return {
        id: album.album_id,
        value: `${album.title} - Artist Name`
      }
    });

    return (
        <div className={className ?? ""}>
            <h4 className="mb-7">Create a Music Log</h4>
            <Field className="bg-push-play-blue-900/18 rounded-xl pt-7 px-12 relative overflow-hidden">
                <Label className="font-semibold">Album</Label>
                <br/>
                <FilteredSelect options={options} placeholderText={"What album are you reviewing?"} />
                <br />
                <Label> My Rating </Label>
                <br />
                <Ratings />
                <br />
                <Label>My Thougts</Label>
                <br />
                <Textarea className="w-full h-48 bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl resize-none px-4 py-2 mb-5.5" />
                <Button 
                    className="float-end mb-6"
                    variant="primary"
                >
                    Log It
                </Button>
            </Field>
        </div>
    )
}