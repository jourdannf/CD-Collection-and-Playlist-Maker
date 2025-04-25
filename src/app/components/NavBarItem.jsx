export default function NavBarItem ({info}) {
    const name = info.name;
    
    return (
        <div className="my-4 py-4 px-3 hover:bg-blue-600 hover:cursor-pointer rounded-lg">
            {name}
        </div>
    )
}