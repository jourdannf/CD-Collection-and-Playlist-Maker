import SpeechBubble from "./SpeechBubble"

export default async function TopThreeContainer () {
    let logs = [];

    try {
        const result = await fetch("http://localhost:3001/api/logs?sort=ratings&order=ASC&limit=3&unique");
        logs = await result.json();
    }catch (e) {
        console.log(e);
        throw e;
    }

    return (
        <>
            <div>

            </div>
            <SpeechBubble />
        </>
    )
}