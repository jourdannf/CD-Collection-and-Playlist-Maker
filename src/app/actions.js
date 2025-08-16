"use server";

import { MusicLogSchema } from "@/lib/utils/zodSchemas";

async function createMusicLog(formData) {

    const result = MusicLogSchema.safeParse(formData);
    if (!result.success) {
        return {
            status: "error",
            message: result.error.message
        }
    }

    const rating = Number(formData.rating) * .5;
    const values = {
        album_id: Number(formData.album.id),
        body: formData.body,
        rating: rating,
    }
    
    //Perform tasks with valid.data
    const opts = {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums/${formData.album.id}/logs`, opts);
        return {
            status: "success",
            message: `New music log succesfully created for ${formData.album.value}`
        }
    }catch(e) {
        return {
            status: "error",
            message: e
        }
    }
    
    

    

    
}

export {createMusicLog};