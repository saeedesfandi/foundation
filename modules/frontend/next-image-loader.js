/**
 * Custom Image Loader برای CDN یا Static Export
 * مثال: src="/images/photo.jpg" → "https://cdn.example.com/images/photo.jpg"
 */
module.exports = function imageLoader({ src, width, quality }) {
  // اگر از CDN استفاده می‌کنی
  const baseUrl = "https://cdn.deepland.ir";
  const params = new URLSearchParams();
  if (width) params.append("w", width.toString());
  if (quality) params.append("q", quality.toString() || "75");

  const url = `${baseUrl}${src}${params.toString() ? `?${params}` : ""}`;
  return url;
};
