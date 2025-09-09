"use client";
import { Input } from "@headlessui/react";

export default function TextInput ({placeholder, variant, name, icon, className, ...register }) {

    return (
        <>
            <div className={`relative items-center ${className}`}>
                <Input
                    id="boomboxSearch"
                    className={`bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl focus:outline-1 focus:drop-shadow-sm focus:drop-shadow-push-play-purple-600 focus:outline-push-play-purple-700 pl-4 w-full` }
                    placeholder={placeholder} 
                    name={name || ""} 
                    type="text"
                    {...(register || {})}
                />
            </div>
        </>
    )
}