"use client"

import { ImageUpIcon } from "lucide-react"
import { useRef, useState } from "react"
import { useController } from "react-hook-form";

export default function ImageUplaod ({name, ref, onChange, setValue, getValues, ...register}) {
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

        validateFiles([...files]);

    }

    function validateFiles (files) {
        setValue("album_art", files, {shouldValidate: true});
        setUploadFile({message: files[0]?.name, sucessful:true});
    }

    function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div className="font-semibold text-push-play-charcoal-700 text-base min-w-[976px] h-[169px] bg-push-play-blue-100 border border-push-play-blue-950 rounded-2xl content-center" onDrop={handleDrop} onDragOver={handleDragOver} >
            <div className="w-40 grid grid-flow-col gap-2 grid-cols-[24px_150px] mx-auto hover:cursor-pointer hover:underline hover:text-push-play-charcoal-900 text-ellipsis" onClick={handleClick} onChange={(e) => {
                const files = [...e.target.files];
                validateFiles(files);
            }}>
                <input name={name} type="file" className="hidden" accept="image/*" ref={(e) => {
                    ref(e);
                    inputRef.current = e;
                }} onChange={onChange} />
                <ImageUpIcon />
                <p>{uploadFile?.message}</p>
            </div>
        </div>
        )
}