'use client'
import { useState, useEffect } from "react"
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useController } from "react-hook-form";

export default function FilteredSelect ({options, placeholderText, addOption, ...others}) {
    const [query, setQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    
    const filteredOptions = query === '' ? options : options.filter((item) => {
        return item.value.toLowerCase().includes(query.toLowerCase());
    });

    const {field, fieldState} = useController(others);

    function handleClose (e) {
        if (!addOption) {
            setQuery('');
        }
    } 
    
    return (
        <>
            <Combobox
                as="div"
                onClose={handleClose}
                defaultValue={query}
                {...field}
            >
                <div className="relative">
                <ComboboxInput 
                    placeholder={placeholderText || ""}
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={(item) => item?.value || query}
                    className="w-full rounded-2xl bg-push-play-blue-100 border border-push-play-blue-950 pl-4 py-0.5 font-normal focus:outline-1 focus:drop-shadow-sm focus:drop-shadow-push-play-purple-600 focus:outline-push-play-purple-700 "   
                />
                <ComboboxButton className="group absolute right-0 px-2.5 bottom-1 hover:cursor-pointer">
                    <ChevronDown/>
                </ComboboxButton>
                </div>
                <ComboboxOptions anchor="bottom" className="border empty:invisible w-(--input-width)" >
                    {(addOption && query.length > 0) && 
                    <ComboboxOption value={{id:null, value: query}}>
                            {query}
                    </ComboboxOption>
                    }
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