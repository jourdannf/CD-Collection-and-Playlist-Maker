export default function NavBarItem ({info}) {
    const name = info.name;
    
    return (
        <>
        <li>
            <button className="my-4 py-2.5 px-3 hover:bg-push-play-blue-700 hover:cursor-pointer rounded-lg flex text-push-play-blue-900 hover:text-push-play-blue-50">
                <p className="flex-auto text-xl ">{name}</p>
            </button>
        </li>
        </>
    )
}