import Image from "next/image";

export default function Album ({variant, albumInfo, width, height, className, showCaption, size, id}) {

    //If size is small then width and height is 118, meidum is 180, and large is 230
    
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

    const containerSize = {
        xs: `size-118px`,
        small: `size-[140px]`,
        medium: `size-[180px]`,
        large: `size-[230px]`
    }
    
    
    return (
        <div className={`${className || {}} ${containerSize[size]} aspect-square`}>
            <Image className="rounded-md" src={albumInfo?.album_art} fill alt={`Picture of album named ${albumInfo?.title}`} />
            {showCaption && 
            <>
                <p className="text-base/[120%] font-semibold mt-2">{albumInfo?.title}</p>
                <p className="text-base/[120%]">{albumInfo?.artist_name}</p>
            </>}
            {/* {renderAlbum()} */}
        </div>
    );
}