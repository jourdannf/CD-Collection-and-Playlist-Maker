'use client'

export default function Button ({variant, className, children}) {
    
    
    return (
        <>
            {variant === "primary" && <button type="button" className={`bg-push-play-blue-500 hover:bg-push-play-blue-600 rounded-md inset-shadow-[1px_1px,-1px_-2px_push-play-blue-600,-1px_-2px] inset-shadow-push-play-blue-600 hover:inset-shadow-push-play-blue-700 py-1 px-5 outline-[1.5px] outline-push-play-blue-950 hover:cursor-pointer uppercase ${className ? className : ""}`}>{children}</button>}

            {variant === "secondary" && <button type="button" className={`bg-push-play-pale-yellow-400 hover:bg-push-play-pale-yellow-500 rounded-md inset-shadow-[1px_1px,-1px_-2px_push-play-blue-00,-1px_-2px] inset-shadow-push-play-pale-yellow-700 hover:inset-shadow-push-play-pale-yellow-800 py-1 px-5 outline-[1.5px] outline-push-play-pale-yellow-950 hover:cursor-pointer ${className ? className : ""}`}>{children}</button>}
        </>
    )
}