// Real public project assets, sourced from the owner's original public GitHub repository.
const galleryDirectories: Record<string,string> = {
  "apizza.webp": "pizza-sales-analytics",
  "Pizza.webp": "pizza-sales-analytics",
  "spotify.webp": "spotify-streaming-analysis",
  "amaven.webp": "maven-market-analysis",
  "maven.webp": "maven-market-analysis",
  "road.webp": "road-accident-analysis",
  "awrep.webp": "adventure-works-report",
  "awreport.webp": "adventure-works-report",
  "acar.webp": "car-transport-management",
  "car.webp": "car-transport-management",
  "charity.webp": "helping-hand",
  "library.webp": "library-management-system"
};
export function projectAssetURL(filename: string): string {
  const directory = galleryDirectories[filename];
  if (!directory) return `https://rmpranto.github.io/assets/img/projects/${encodeURIComponent(filename)}`;
  return `/assets/projects/${directory}/${encodeURIComponent(filename)}`;
}
