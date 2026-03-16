function normalizePath(path: string) {
  return path.replace(/^\/+/, "");
}

function buildUrl(base: string | undefined, path: string) {
  if (!base) return "";
  return `${base}/${normalizePath(path)}`;
}

export function getAssetUrl(path: string) {
  return buildUrl(process.env.NEXT_PUBLIC_R2_ASSETS_URL, path);
}

export function getIconUrl(path: string) {
  return buildUrl(process.env.NEXT_PUBLIC_R2_ICONS_URL, path);
}

export function getGalleryUrl(path: string) {
  return buildUrl(process.env.NEXT_PUBLIC_R2_GALLERY_URL, path);
}

export function getYoutubeThumbUrl(path: string) {
  return buildUrl(process.env.NEXT_PUBLIC_R2_YT_URL, path);
}