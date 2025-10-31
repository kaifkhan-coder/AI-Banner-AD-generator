
import { GoogleGenAI, Type } from "@google/genai";
import { AdData, AdSize, AspectRatio } from '../types';
import { STANDARD_AD_SIZES } from '../constants';

// Ensure the API key is available from environment variables.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateProductImage = async (description: string, aspectRatio: AspectRatio): Promise<string> => {
  console.log(`Generating image with aspect ratio: ${aspectRatio}`);
  const imageModel = 'imagen-4.0-generate-001';
  
  const response = await ai.models.generateImages({
    model: imageModel,
    prompt: `A high-quality, photorealistic product shot for an advertisement. The product is described as: "${description}". The image should be clean, professional, and visually appealing, suitable for a banner ad. No text on the image.`,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio,
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error('Image generation failed, no images returned.');
  }

  const base64ImageBytes = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
};

const generateAdCopy = async (description: string, url: string, size: AdSize): Promise<{ headline: string; cta: string }> => {
  console.log(`Generating copy for size: ${size.width}x${size.height}`);
  const textModel = 'gemini-2.5-flash';

  const prompt = `You are an expert marketing copywriter. Based on the product description, create a compelling headline and a short, punchy call-to-action (CTA) for a banner ad.

Product Description: "${description}"
Product URL: "${url}"
Ad Dimensions: ${size.width}x${size.height} pixels
Ad Name: ${size.name}

Constraints:
- The headline must be concise and grab attention. Keep it short, especially for smaller ad sizes.
- The CTA should be a clear, action-oriented phrase (e.g., "Shop Now", "Learn More", "Get Yours").
- Return ONLY a valid JSON object.

Example Output:
{
  "headline": "Your New Favorite Gadget",
  "cta": "Discover More"
}`;

  const response = await ai.models.generateContent({
    model: textModel,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          cta: { type: Type.STRING },
        },
        required: ["headline", "cta"],
      }
    }
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as { headline: string; cta: string };
  } catch(e) {
    console.error("Failed to parse JSON from Gemini:", jsonText);
    throw new Error("Could not generate valid ad copy. The model response was not valid JSON.");
  }
};


export const generateAds = async (description: string, url: string, aspectRatio: AspectRatio): Promise<AdData[]> => {
  // 1. Generate one image for all ads.
  const imageUrl = await generateProductImage(description, aspectRatio);

  // 2. Generate copy for each ad size in parallel.
  const adCopyPromises = STANDARD_AD_SIZES.map(size => 
    generateAdCopy(description, url, size)
  );
  
  const adCopies = await Promise.all(adCopyPromises);

  // 3. Combine image and copies into final AdData objects.
  const allAds: AdData[] = STANDARD_AD_SIZES.map((size, index) => ({
    ...size,
    imageUrl,
    headline: adCopies[index].headline,
    cta: adCopies[index].cta,
    productUrl: url,
  }));

  return allAds;
};
