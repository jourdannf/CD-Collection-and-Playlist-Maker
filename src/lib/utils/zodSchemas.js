import * as z from "zod"

const albumErrorMessage = "Enter an album that exists in your collection.";
const ratingErrorMessage = "Leave a rating in between 1 and 5";
const bodyErrorMessage = "Leave a brief description of why you gave your rating.";

export const MusicLogSchema = z.object({
    album: z.object({
        id: z.number(albumErrorMessage),
        value: z.string(albumErrorMessage).min(1, albumErrorMessage).nullable(false, albumErrorMessage)
    }, albumErrorMessage),
    body: z.string(bodyErrorMessage).min(1, bodyErrorMessage).nullable(false, bodyErrorMessage),
    rating: z.coerce.number(ratingErrorMessage).gt(0, ratingErrorMessage).lte(10)
});

const trackInfoSchema = z.object({
    value: z.string().min(1, "At least one traack is required")
})

const imageSchema = z.file("Please attach an image for the album art of your album")
        .mime(["image/jpeg", "image/png", "image/jpg", "image/webp"], {error: "Sorry, file format is not accepted"})
        .max(2000000, "File size limit has been exceeded. Maximum size allowed is 2MB");

export const AlbumSchema = z.object({ //figure out how to make the second track optional -- too tired to figure it out rn
    album_art: z.array(imageSchema, "Please attach an image for the album art of your album").length(1, "Upload exactly one image for the album art"),
    title: z.string("Please leave a name for the title of the album").min(2, "Please leave a name for the title of the album"),
    artist_name: z.string("Please leave the name of the artist who made the album").min(2, "Please enter the name of an artist this album belongs to"),
    release_date: z.iso.date("Please provide a valid date"),
    tracks: z.tuple([trackInfoSchema], z.object({value: z.string()})) //Has to have at least one track with a name, other vals can be empty
});

export const userRegisterationSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email()
});



