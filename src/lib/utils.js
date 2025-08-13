"use server";

async function createMusicLog(formData) {
      

      // Turn data into an object
      // Add it to the request body
      // Make a post fetch

      const rating = Number(formData.get('rating')) * .5;
      const musicLogBody = {
        album_id: formData.get('album[id]'),
        body: formData.get('body'),
        rating: rating,
    }
}

export {createMusicLog};