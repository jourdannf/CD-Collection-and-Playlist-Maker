'use client'

export function Select({options, position}) {
    return (
        <>
            <select name="" id="" className={position == "centered" ? "absolute top-1/2 left-1/2 -translate-1/2 w-44" : ""}>
                <option>{"Select an option"} </option>
                {options?.map((opt, i) => {
                    return (
                        <option key={`${opt.value}_${i}`}>{opt.value}</option>
                    )
                })}
            </select>
        </>
    )
}