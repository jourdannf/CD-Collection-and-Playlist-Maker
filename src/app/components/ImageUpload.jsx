"use client"

import { ImageUpIcon } from "lucide-react"
import { useRef, useState } from "react"

export default function ImageUplaod ({name}) {
    const inputRef = useRef(null);
    const [uploadFile, setUploadFile] = useState({message: "Upload Image File", successful: false});

    function handleClick (e) {
        inputRef.current.click();
    }

    function handleDrop (e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;

        validateFiles(files);

    }

    function validateFiles (files) {
        if (files.length > 1) { // checks if file is a singular file
            //return an error
        }

        //check for size
        const file = files[0];
        const fileSize = file.size/1024; //file size in kb
        const limit = 2000; //2mb in kb double check later
        if (fileSize < limit) {
            //return an error
        }

        //update file name
        setUploadFile({message: file.name, sucessful:true});
    }

    function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div className="font-semibold text-push-play-charcoal-700 text-base min-w-[976px] h-[169px] bg-push-play-blue-100 border border-push-play-blue-950 rounded-2xl content-center">
            <div className="w-40 grid grid-flow-col gap-2 grid-cols-[24px_150px] mx-auto hover:cursor-pointer hover:underline hover:text-push-play-charcoal-900 text-ellipsis" onClick={handleClick} onDrop={handleDrop} onChange={(e) => {validateFiles(e.target.files)}} onDragOver={handleDragOver}>
                <input name={name} ref={inputRef} type="file" className="hidden" accept="image/*" />
                <ImageUpIcon />
                <p>{uploadFile?.message}</p>
            </div>
        </div>
        )
}