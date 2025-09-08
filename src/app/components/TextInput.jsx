"use client";
import { Input } from "@headlessui/react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function TextInput ({placeholder, variant, name, icon, className }) {
    //handle change in it's own function and update search params based on it?
    // const searchParams = useSearchParams();
    // const pathname = usePathname();
    // const {replace} = useRouter();

    
    // const handleChange = useDebouncedCallback((text) => {
    //     const params = new URLSearchParams(searchParams);
    //     if (text) {
    //         params.set("query", text);
    //     }else {
    //         params.delete("query");
    //     }

    //     replace(`${pathname}?${params.toString()}`, {scroll: false});

    // }, 200)

    return (
        <>
            <div className={`relative items-center ${className}`}>
                <Input
                    id="boomboxSearch"
                    className={`bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl focus:outline-1 focus:drop-shadow-sm focus:drop-shadow-push-play-purple-600 focus:outline-push-play-purple-700 pl-4 w-full` }
                    placeholder={placeholder} 
                    name={name || ""} 
                    type="text"
                />
            </div>
        </>
    )
}