"use server";

import * as z from "zod"

const MusicLog = z.object({
    album_id: z.number("Enter an album title in your collection."),
    body: z.string("Leave a short desciption of your review"),
    rating: z.number("Leave a rating in between 1 and 5")
})

async function createMusicLog(formData) {
      

      // Turn data into an object
      // Add it to the request body
      // Make a post fetch

      const rating = Number(formData.get('rating')) * .5;
      const musicLogBody = {
        album_id: Number(formData.get('album[id]')),
        body: formData.get('body'),
        rating: rating,
    }
    const valid = MusicLog.safeParse(musicLogBody);
    if (!valid.success) {

    }else {
        //Perform tasks with valid.data
        const opts = {
            method: "POST",
            body: JSON.stringify(valid.data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const result = fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums/${formData.get('album[id]')}/logs`, opts);
        

        

    }
}

export {createMusicLog};