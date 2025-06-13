import Image from "next/image";
import Album from "./components/Album";
import TextInput from "./components/Input";
import Select from "./components/Select";
import FilteredSelect from "./components/FilteredSelect";
import { Field, Label } from "@headlessui/react";

let recentPlays = [];
let options = [];
let testItems = [
  {
    id: 2,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  }, 
  {
    id: 3,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 20,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 34,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 7,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 16,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
 
];

export default async function Home() {
  
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
    <>
    <div className="grid sm:grid-cols-[0.32fr_0.68fr] grid-rows-[0.20fr_544px_0.36fr] mx-11 h-screen overflow-y-scroll">
      <div className="col-start-1 col-end-3 h-auto mb-24">
        <h4 className="mb-7 pt-7">Recently Played</h4>
        <div className="grid grid-flow-col auto-cols-[19%] overflow-x-scroll">
          {
            testItems?.map((e) => {
              return <Album key={e.id} albumInfo={e} width="150" height="150" />
            })
          }
        </div>
      </div>

      <div className="col-start-1 col-end-3">
        <h4 className="mb-7">Create a Music Log</h4>
        <Field className="bg-push-play-blue-900/18 h-100 rounded-xl pt-7 px-12">
          <Label className="font-semibold">Album</Label>
          <FilteredSelect options={options} placeholderText={"What album are you reviewing?"}/>
          <p> My Rating </p>
          <input type="text" />
          <p>My Thougts</p>
          <textarea name="" id=""></textarea>
        </Field>
      </div>
      
      <div className="col-start-1 col-end-2">
          <h4>My Top Three Picks</h4>
      </div>
      <div className="col-start-2 col-end-3">
          <h4>Recent Logs</h4>
      </div>
      
    </div>
    </>
  );
}
