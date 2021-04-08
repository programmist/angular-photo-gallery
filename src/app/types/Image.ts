export interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer_id: number;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: SizeVariations;
  liked: boolean;
}

interface SizeVariations {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
