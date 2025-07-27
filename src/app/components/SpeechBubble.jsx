export default function SpeechBubble ({albumInfo}) {
    return (
        <div className="text-base w-80 bg-white">
            {albumInfo?.body}
        </div>
    )
}