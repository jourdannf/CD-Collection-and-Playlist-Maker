import Image from "next/image";

export default function Album ({variant, albumInfo, width, height, className}) {
    
    const renderAlbum = () => {
        switch (variant) {
            case "showCaption":
                return (
                    <>
                        <Image src={albumInfo.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo.title}`} className="rounded-md" />
                        <p>{albumInfo.title}</p>
                        <p>{albumInfo.artist_name}</p>
                    </>
                )
            default:
                return (
                    <Image src={albumInfo.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo.title}`} className="rounded-md" />                 
                )
    }
    }
    
    
    
    return (
        <div className={className}>
            {renderAlbum()}
        </div>
    );
}