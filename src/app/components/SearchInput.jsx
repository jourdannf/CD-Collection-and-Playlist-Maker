"use client";
import { Input } from "@headlessui/react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchInput ({placeholder, variant, name, icon, className, id }) {
    //handle change in it's own function and update search params based on it?
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    
    const handleChange = useDebouncedCallback((text) => {
        const params = new URLSearchParams(searchParams);
        if (text) {
            params.set("query", text);
        }else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`, {scroll: false});

    }, 200)

    return (
        <>
            <div className={`relative items-center ${className}`}>
                <Input
                    id={id || ""}
                    className={`bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl focus:outline-1 focus:drop-shadow-sm focus:drop-shadow-push-play-purple-600 focus:outline-push-play-purple-700 w-[inherit] h-[inherit] pl-8 py-0.5` }
                    placeholder={placeholder} 
                    name={name || ""} 
                    type="text"
                    onChange={(e) => {                        
                        handleChange(e.target.value)
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                />
                <div className="absolute left-3 top-2">{variant == "startIcon" && icon}</div>
            </div>
        </>
    )
}