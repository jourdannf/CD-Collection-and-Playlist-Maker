import Ratings from "./Ratings";
import { Field, Label } from "@headlessui/react";
import FilteredSelect from "./FilteredSelect";

export default async function MusicLog ({className}) {
    let options = [];
    let recentPlays = [];
    
    const opts = {
        method: "GET"
      }
      try {
        const res = await fetch('http://localhost:3001/api/history', opts);
        const resArray = await res.json();
  
        recentPlays = resArray;
  
        const albumsRes = await fetch('http://localhost:3001/api/albums', opts);
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
            <Field className="bg-push-play-blue-900/18 h-100 rounded-xl pt-7 px-12">
                <Label className="font-semibold">Album</Label>
                <FilteredSelect options={options} placeholderText={"What album are you reviewing?"} />
                <Label> My Rating </Label>
                <br />
                <Ratings />
                <p>My Thougts</p>
                <textarea name="" id=""></textarea>
            </Field>
        </div>
    )
}