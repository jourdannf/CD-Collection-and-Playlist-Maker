'use client'
import { useState, useEffect, useRef } from "react"
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useController } from "react-hook-form";

export default function FilteredSelect ({options, placeholderText, addOption, onChange, name, setValue, isSubmitted, ref, ...others}) {
    const [query, setQuery] = useState('');
    const [prevItem, setPrevItem] = useState({});
    const [selectedItem, setSelectedItem] = useState('');
    const inputRef = useRef(null);

    
    const filteredOptions = query === '' ? options : options.filter((item) => {
        return item.value.toLowerCase().includes(query.toLowerCase());
    });

    // const {field, fieldState} = useController(others);
    // console.log(field)
    // console.log(others)

    function handleClose (e) {
        if (!addOption) {
            setQuery('');
        }
    }

    function handleOptionChange(option) {
        if (addOption){
            const value = option?.value || ""
            if (option) {
                setQuery(option.value);
                inputRef.current.removeAttribute("data-focus")
                if (isSubmitted) { //should validate only after submit
                    setValue(name, value, {shouldValidate: true});
                }else {
                    setValue(name, value)
                }
            }
        }
        
    }

    function handleDispalyValue (item) {
        return query
    }
    
    return (
        <>
            <Combobox
                // as="div"
                onClose={handleClose}
                defaultValue={query}
                onChange={handleOptionChange}
            >
                <div className="relative">
                <ComboboxInput 
                    placeholder={placeholderText || ""}
                    onChange={async (e) => { setQuery(e.target.value); onChange(e)}}
                    displayValue={handleDispalyValue}
                    className="w-full rounded-2xl bg-push-play-blue-100 border border-push-play-blue-950 pl-4 py-0.5 font-normal focus:outline-1 focus:drop-shadow-sm data-focus:drop-shadow-push-play-purple-600 data-focus:outline-push-play-purple-700 "
                    name={name || ""}
                    ref={(e) => {
                        ref(e);
                        inputRef.current = e;
                    }}
                    {...others} 
                    
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