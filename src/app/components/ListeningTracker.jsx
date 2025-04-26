'use client'
import Image from "next/image"
import { Select } from "./Select";
import { useEffect, useState } from "react"

export default function ListeningTracker () {
    const [albums, setAlbums] = useState([]);

    //Note might have to update when a new album is added by user
    useEffect(() => {

        (async () => {
            const url = "/api/albums";
            const options = {
                method: "GET"
            }

            try{
                const res = await fetch(url, options);
                setAlbums(await res.json());
            }catch (e) {
                console.log(e);
                throw e;
            } 
        })();
    }, [])

    const options = (() => {
        let opts = [];

        for (let i = 0; i < albums.length; i ++) {
            let album = albums[i];
            let opt = {
                value: `${album.title} - Artist Name`
            }

            opts.push(opt);
        }

        return opts;
    })();

    return (
        <div className="relative w-[200px]">
            <h6 className="text-push-play-charcoal-950">Listening To...</h6>
            <Image src={"/public/file.svg"} width="200" height="200" alt="Music user is currently listening to" className="rounded-xl border border-solid" />
            <Select options={options} position={"centered"}/>

            <button>PLAY</button>
        </div>
    )
}