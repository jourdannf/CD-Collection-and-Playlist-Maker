"use client"
import { Input } from "@headlessui/react"
import { useState } from "react"

export default function InputText ({placeholder, variant, name, icon, className, handleChange }) {
    

    return (
        <>
            <div className={`relative ${className}`}>
                <Input 
                    className={`bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl focus:outline-1 focus:drop-shadow-sm focus:drop-shadow-push-play-purple-600 focus:outline-push-play-purple-700 w-[inherit] h-[inherit] pl-5` }
                    placeholder={placeholder} 
                    name={name ? name : ""} 
                    type="text"
                    onChange={handleChange}
                />
                {variant == "startIcon" && icon}
            </div>
        </>
    )
}