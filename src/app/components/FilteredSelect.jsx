'use client'
import { useState, useEffect } from "react"
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { ChevronDown, ChevronLeft } from "lucide-react";

export default function FilteredSelect ({options, placeholderText, name, required}) {
    const [query, setQuery] = useState('');

    
    const filteredOptions = query === '' ? options : options.filter((item) => {
        return item.value.toLowerCase().includes(query.toLowerCase());
    });

    // console.log(filteredOptions)
    
    return (
        <>
            <Combobox name={name ? name : ""} defaultValue={''}  onClose={() => setQuery('')} >
                <div className="relative">
                <ComboboxInput 
                    placeholder={placeholderText}
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={(item) => item?.value}
                    className="w-full rounded-2xl bg-push-play-blue-100 border border-push-play-blue-950 pl-4 py-0.5 font-normal "
                    required={required}
                />
                <ComboboxButton className="group absolute right-0 px-2.5 bottom-1 hover:cursor-pointer">
                    <ChevronDown/>
                </ComboboxButton>
                </div>
                <ComboboxOptions anchor="bottom" className="border empty:invisible w-(--input-width)" >
                    {filteredOptions.map((item) => (
                    <ComboboxOption key={item?.id} value={item} className="data-focus:bg-push-play-blue-300">
                        {`${item?.value}`}
                    </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </>
    )
}