import Image from "next/image";

export default function Album ({albumInfo, width, height}) {
    return (
        <div className="row-span-1">
            <Image src={albumInfo.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo.title}`} className="rounded-md" />
            <p>{albumInfo.title}</p>
            <p>{albumInfo.artist_name}</p>
        </div>
    );
}