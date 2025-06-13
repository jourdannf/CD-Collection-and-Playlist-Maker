export default function TextInput ({placeholder, labelName }) {
    return (
        <>
            <label className="font-semibold" htmlFor={`${labelName}`}>{`${labelName}`}</label>
            <br />
            <input className="bg-push-play-blue-100 border border-push-play-blue-950 rounded-xl " type="text" name={`${labelName}`} placeholder={`${placeholder}`} />
        </>
    )
}