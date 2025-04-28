'use client'
import Image from "next/image"
import Select from "./Select";
import Button from "./Button";
import { useEffect, useState } from "react"

export default function ListeningTracker () {
    const [albums, setAlbums] = useState([]);
    const [imgLink, setImgLink] = useState("/public/file.svg");

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
                id: album.album_id,
                value: `${album.title} - Artist Name`,
                link: `${album.album_art}`
            }

            opts.push(opt);
        }

        return opts;
    })();

    return (
        <div className="relative w-[200px] ">
            <h6 className="text-push-play-charcoal-950">Listening To...</h6>
            <div className="text-center">
            <Image src={imgLink} width="200" height="200" alt="Music user is currently listening to" className="rounded-xl border border-solid" />
            <Select options={options} position={"centered"} changeImg={setImgLink} />
            <Button text="PLAY" className="bg-push-play-blue-500 hover:bg-push-play-blue-600 rounded-md inset-shadow-[1px_1px,-1px_-2px_push-play-blue-600,-1px_-2px] inset-shadow-push-play-blue-600 hover:inset-shadow-push-play-blue-700 py-1 px-5 text-sm outline-[1.5px] outline-push-play-blue-950 relative bottom-3.5 hover:cursor-pointer" />
            </div>
        </div>
    )
}