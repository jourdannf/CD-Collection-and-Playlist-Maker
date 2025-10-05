export default function AlbumPageHeader ({album}) {

    const date = new Date(album.release_date);

    return (
       <header className="album-header mb-3">
            <h1>{album.title}</h1>
            <h5>{album.artist_name}</h5>
            <ul className="flex ">
                <li><h6>K-Pop</h6></li>
                <li><h6>16 songs</h6></li>
                <li><h6>{date.toLocaleDateString()}</h6></li>
                <li><h6>{`${album.plays} Plays`}</h6></li>
            </ul>
       </header>
    )
}