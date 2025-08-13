import { Fragment } from "react"
import { RadioGroup, Radio, Label, Field } from "@headlessui/react"
import { Star, StarHalf } from "lucide-react"

export default function Ratings ({disabled, rating, className, name, required}) {
    const stars = ["full", "half", "full", "half", "full", "half", "full", "half", "full", "half"]

    // input:checked + label:hover => [&>span[data-checked]+label>svg:hover]
    // input:checked ~ label:hover => [&>span[data-checked]~label>svg:hover]
    // input:checked ~ label:hover ~ label => [&>span[data-checked]~label:hover~label>svg]
    // label:hover ~ input:checked ~ label => [&>label:hover~span[data-checked]~label>svg]

    //input:checked ~ label => [&>span[data-checked]~label+svg]
    //label:hover => [&>label+svg:hover]
    //label:hover ~ label => [&>label:hover~label+svg]

    if (disabled) {

        const roundedRating = parseFloat((Math.round(rating * 2)/2).toFixed(1));

        const ratingVariants = {
            5: "[&>*:nth-of-type(1)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(1)~div>svg]:fill-push-play-pale-yellow-500",
            4.5: "[&>*:nth-of-type(2)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(2)~div>svg]:fill-push-play-pale-yellow-500",
            4: "[&>*:nth-of-type(3)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(3)~div>svg]:fill-push-play-pale-yellow-500",
            3.5: "[&>*:nth-of-type(4)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(4)~div>svg]:fill-push-play-pale-yellow-500",
            3: "[&>*:nth-of-type(5)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(5)~div>svg]:fill-push-play-pale-yellow-500",
            2.5: "[&>*:nth-of-type(6)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(6)~div>svg]:fill-push-play-pale-yellow-500",
            2: "[&>*:nth-of-type(7)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(7)~div>svg]:fill-push-play-pale-yellow-500",
            1.5: "[&>*:nth-of-type(8)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(8)~div>svg]:fill-push-play-pale-yellow-500",
            1: "[&>*:nth-of-type(9)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(9)~div>svg]:fill-push-play-pale-yellow-500",
            0.5: "[&>*:nth-of-type(10)>svg]:fill-push-play-pale-yellow-500 [&>*:nth-of-type(10)~div>svg]:fill-push-play-pale-yellow-500",
            0: ""
        }


        return (
            <div className={`inline-block ${ratingVariants[roundedRating]} ${className ? className : ""}`}>
                {stars.map((starType, i) => {
                    return (
                        <div key={i} className = "text-push-play-pale-yellow-700 float-right relative">
                        {starType === "full" ?
                        <Star size={22} strokeWidth={2}/> :
                        <StarHalf className="absolute" width="12" viewBox="0 0 12 24" size={22} strokeWidth={2} />}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        
        <RadioGroup 
            defaultValue={''} 
            aria-label="Server size" 
            className={`border-0 inline-block relative [&>span[data-checked]+label>svg:hover]:fill-push-play-pale-yellow-300 [&>span[data-checked]~label>svg:hover]:fill-push-play-pale-yellow-300 [&>span[data-checked]~label:hover~label>svg]:fill-push-play-pale-yellow-300 [&>label:hover~span[data-checked]~label>svg]:fill-push-play-pale-yellow-300 [&>span[data-checked]~label>svg]:fill-push-play-pale-yellow-500 [&>label>svg:hover]:fill-push-play-pale-yellow-500 [&>label:hover~label>svg]:fill-push-play-pale-yellow-500 [&>label>svg:hover]:cursor-pointer`}
            disabled={disabled}
            name={name}
        >
            {stars.map((starType, i) => {
                return (
                    <Field as={Fragment} key={starType+i}>
                        <Radio
                            as="input"
                            value={`${10-i}`}
                            className="hidden "
                            required={required}
                        >
                            
                        </Radio>
                        <Label className={`float-right text-push-play-pale-yellow-700  `}>
                            {starType === "full" ? 
                            <Star size={22} strokeWidth={2}/> : 
                            <StarHalf width="12" viewBox="0 0 12 24" className="absolute" size={22} strokeWidth={2} />}
                        </Label>
                    </Field>
                )
            })}
        </RadioGroup>
        
    )
}