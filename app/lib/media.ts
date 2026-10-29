// Poster image for a Cloudinary video: its first frame, resized and auto-compressed.
// Returns undefined for videos hosted elsewhere.
export function videoPoster(url: string, width = 720) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) return undefined;
  return url
    .replace("/video/upload/", `/video/upload/so_0,w_${width},q_auto/`)
    .replace(/\.(mp4|mov|webm)$/i, ".jpg");
}
