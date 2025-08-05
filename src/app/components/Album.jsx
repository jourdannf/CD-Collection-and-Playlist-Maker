import Image from "next/image";

export default function Album ({variant, albumInfo, width, height, className, id}) {

    
    
    const renderAlbum = () => {
        switch (variant) {
            case "showCaption":
                return (
                    <>
                        <Image src={albumInfo?.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo.title}`} className="rounded-md" />
                        <p className="text-base/[120%] font-semibold mt-2">{albumInfo?.title}</p>
                        <p className="text-base/[120%]">{albumInfo?.artist_name}</p>
                    </>
                )
            default:
                return (
                    <Image src={albumInfo?.album_art} width={width} height={height} alt={`Picture of album named ${albumInfo.title}`} className={`rounded-md ${className}`} />                 
                )
    }
    }
    
    
    
    return (
        <div className={className}>
            {renderAlbum()}
        </div>
    );
}