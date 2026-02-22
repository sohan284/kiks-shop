import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes image URLs to ensure they point directly to the image asset.
 * Especially useful for Imgur links which often return the viewer page URL.
 */
export function getDirectImageUrl(url) {
  if (!url || typeof url !== "string") return url;

  // Handle Imgur links
  if (url.includes("imgur.com") && !url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
    // If it's a mobile link like m.imgur.com, normalize it
    const cleanUrl = url.replace("m.imgur.com", "imgur.com");
    
    // Extract the ID and return the direct link
    // Examples: https://imgur.com/ZANVnHE or http://imgur.com/a/ABCDE
    const idMatch = cleanUrl.match(/imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]+)/);
    if (idMatch && idMatch[1]) {
      return `https://i.imgur.com/${idMatch[1]}.jpeg`;
    }
  }

  return url;
}
