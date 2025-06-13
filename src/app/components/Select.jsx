

export default function Select({options, position, changeImg}) {
    function updateImageLink(link) {
        const albumSelect = document.getElementById("albumPlaying");

        const value = albumSelect.value;

        for (let i = 0; i < options.length; i ++) {
            if (options[i].album_id == value) {
                changeImg(options[i].album_art);
            }
        }
    }

    
    
    return (
        <>
            <select name="" id="albumPlaying" className={`${position == "centered" ? "absolute top-1/2 left-1/2 -translate-1/2 w-44" : ""} bg-push-play-blue-100 rounded-xl border border-push-play-blue-950`}>
                <option>{"Select an option"} </option>
                {options?.map((opt, i) => {
                    return (
                        <option key={`${opt.id}_${opt.value}`} value={opt.id}>{opt.value}</option>
                    )
                })}
            </select>
        </>
    )
}