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
})

export {MusicLogSchema};