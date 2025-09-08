import * as z from "zod"

const albumErrorMessage = "Enter an album that exists in your collection.";
const ratingErrorMessage = "Leave a rating in between 1 and 5";
const bodyErrorMessage = "Leave a brief description of why you gave your rating.";

const MusicLogSchema = z.object({
    album: z.object({
        id: z.number(albumErrorMessage),
        value: z.string(albumErrorMessage).min(1, albumErrorMessage).nullable(false, albumErrorMessage)
    }, albumErrorMessage),
    body: z.string(bodyErrorMessage).min(1, bodyErrorMessage).nullable(false, bodyErrorMessage),
    rating: z.coerce.number(ratingErrorMessage).gt(0, ratingErrorMessage).lte(10)
});

const albumArtErrorMssg = "You can only upload images."

const AlbumSchema = z.object({
    album_art: z
        .file("Please attach an image for the album art of your album")
        .mime(["image/jpeg", "image/png", "image/jpg", "image/webp"], {error: "Sorry, file format is not accepted."})
        .max(2000000, "File is too big."),
    title: z.string("Please leave a name for the title of the album"),
    artist_name: z.string("Please leave the name of the artist who made the album"),
    release_date: z.iso.date("Please provide a valid date"),
    tracks: z.array(z.string()).min(1, {error: "All albums must be submitted with at least one track."})
});

export {MusicLogSchema, AlbumSchema};