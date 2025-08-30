import Image from "next/image";

export default function Album ({variant, albumInfo, width, height, className, id}) {

    
    
    const renderAlbum = () => {
        switch (variant) {
            case "showCaption":
                return (
                    <div>
                        <Image src={albumInfo?.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo.title}`} className={`rounded-md ${className}`} />
                        <p className="text-base/[120%] font-semibold mt-2">{albumInfo?.title}</p>
                        <p className="text-base/[120%]">{albumInfo?.artist_name}</p>
                    </div>
                )
            default:
                return (
                    <Image src={albumInfo?.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo?.title}`} className={`rounded-md ${className}`}  />                 
                )
    }
    }
    
    
    
    return (
        <>
            {renderAlbum()}
        </>
    );
}