// Stock image registry (sourced from Pexels/Unsplash; safe licenses). Always provide alt text.
// Consumers may choose among options per section.

import images from "./images.json" assert { type: "json" };

export type ImageItem = { alt: string; src: string };

export const IMAGES = images as unknown as {
  homeHero: ImageItem[];
  compliance: ImageItem[];
  revenue: ImageItem[];
  risk: ImageItem[];
  whoWeServe: ImageItem[];
  partners: Record<string, ImageItem[]>;
};
