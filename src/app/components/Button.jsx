'use client'

export default function Button ({variant, text, className, children}) {
    
    
    return (
        <>
            {variant === "primary" && <button className={`bg-push-play-blue-500 hover:bg-push-play-blue-600 rounded-md inset-shadow-[1px_1px,-1px_-2px_push-play-blue-600,-1px_-2px] inset-shadow-push-play-blue-600 hover:inset-shadow-push-play-blue-700 py-1 px-5 outline-[1.5px] outline-push-play-blue-950 hover:cursor-pointer uppercase ` + className}>{children}</button>}
        </>
    )
}