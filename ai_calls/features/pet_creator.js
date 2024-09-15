import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from "node:fs";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function makePet(attributes) {
    const emotions = ['very happy', 'slightly unhappy', 'very sad'];
    const imageUrls = [];

    for (let emotion of emotions) {
        const prompt = `Using these details, make an adorable pet: ${attributes}. 
                        It should have a ${emotion} expression. 
                        The pet should be facing the viewer and should fit perfectly within the frame of the image.`;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        const imageUrl = response.data[0].url;
        console.log(`Image URL (${emotion}):`, imageUrl);
        imageUrls.push(imageUrl);

        const rbgResultData = await removeBg(imageUrl);
        fs.writeFileSync(`${emotion}-no-bg.png`, Buffer.from(rbgResultData));
        console.log(`Background-removed image saved as ${emotion}-no-bg.png`);
    }

    return imageUrls;
}


async function removeBg(imageURL) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", imageURL);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "jriS8ptFthQkxe3XbqX5Re3X" },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

makePet("A red dragon with blue eyes")