import fetchAlbum from "@/lib/utils/fetchAlbums";
import AlbumPageHeader from "../(components)/AlbumPageHeader";
import Ratings from "@/app/components/Ratings";
import Button from "@/app/components/Button";
import { fetchTracks } from "@/lib/utils/fetchTracks";
import TrackList from "@/app/components/TrackList";
import { fetchLogsByAlbum } from "@/lib/utils/fetchLogs";
import MusicLog from "@/app/components/MusicLog";
import MusicLogInput from "@/app/components/MusicLogInput";

export default async function AlbumPage ({params}) {
    const {album_id} = await params;
    const album = await fetchAlbum(album_id); //TODO: Handle if album doesn't exist ?? maybe on server
    const tracks = await fetchTracks(album);
    const logs = await fetchLogsByAlbum(album);

    return (
        <>
            <section className="mb-40">
                <div className="mb-22">
                    <AlbumPageHeader album={album} />
                    <div className="flex gap-x-4 align-center">
                        <Ratings disabled rating={album.rating} />
                        <Button variant={"secondary"}>Now Playing</Button>
                    </div>
                    
                </div>

                <TrackList tracks={tracks} className="mx-8"/>

            </section>

            <section className="mb-16">
                <h5 className="w-max">My <span className="italic">{album.title}</span> Logs</h5>
                <div className="flex gap-3 border border-amber-500">
                    {logs.map((log) => {
                        return (
                        <div key={log.log_id} className="basis-[140px] grow-1 max-w-[200px] shrink-0">
                            <MusicLog  logInfo={log} imgSize="small" direction="vertical" className="" />
                        </div>
                        )
                        
                    })}
                </div>    
            </section>

            <section>
                <h5>Create Another Music Log</h5>
                <MusicLogInput />
            </section>
        </>
    )

}