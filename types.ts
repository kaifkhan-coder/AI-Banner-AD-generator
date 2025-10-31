
export interface AdSize {
  name: string;
  width: number;
  height: number;
}

export interface AdData extends AdSize {
  imageUrl: string;
  headline: string;
  cta: string;
  productUrl: string;
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
