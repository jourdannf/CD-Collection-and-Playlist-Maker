import { Fragment } from "react"
import { RadioGroup, Radio, Label, Field } from "@headlessui/react"
import { Star, StarHalf } from "lucide-react"

export default function Ratings () {
    const stars = ["full", "half", "full", "half", "full", "half", "full", "half", "full", "half"]

    // input:checked + label:hover => [&>span[data-checked]+label>svg:hover]
    // input:checked ~ label:hover => [&>span[data-checked]~label>svg:hover]
    // input:checked ~ label:hover ~ label => [&>span[data-checked]~label:hover~label>svg]
    // label:hover ~ input:checked ~ label => [&>label:hover~span[data-checked]~label>svg]

    //input:checked ~ label => [&>span[data-checked]~label+svg]
    //label:hover => [&>label+svg:hover]
    //label:hover ~ label => [&>label:hover~label+svg]
    
    return (
        <>
            <RadioGroup 
                defaultValue={''} 
                aria-label="Server size" 
                className="border-0 inline-block relative [&>span[data-checked]+label>svg:hover]:fill-push-play-pale-yellow-300 [&>span[data-checked]~label>svg:hover]:fill-push-play-pale-yellow-300 [&>span[data-checked]~label:hover~label>svg]:fill-push-play-pale-yellow-300 [&>label:hover~span[data-checked]~label>svg]:fill-push-play-pale-yellow-300 [&>span[data-checked]~label>svg]:fill-push-play-pale-yellow-500 [&>label>svg:hover]:fill-push-play-pale-yellow-500 [&>label:hover~label>svg]:fill-push-play-pale-yellow-500 [&>label>svg:hover]:cursor-pointer"
            >
                {stars.map((starType, i) => {
                    return (
                        <Field as={Fragment} key={starType+i}>
                            <Radio
                                value={`${10-i}`}
                                className="group size-5 items-center justify-center rounded-full border bg-white hidden"
                            >
                                <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
                            </Radio>
                            <Label className="float-right text-push-play-pale-yellow-700">
                                {starType === "full" ? 
                                <Star size={22} strokeWidth={2}/> : 
                                <StarHalf width="12" viewBox="0 0 12 24" className="absolute" size={22} strokeWidth={2} />}
                            </Label>
                        </Field>
                    )
                })}
            </RadioGroup>
        </>
    )
}