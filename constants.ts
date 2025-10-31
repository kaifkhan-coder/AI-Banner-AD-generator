
import { AdSize, AspectRatio } from './types';

export const STANDARD_AD_SIZES: AdSize[] = [
  { name: 'Leaderboard', width: 728, height: 90 },
  { name: 'Large Rectangle', width: 336, height: 280 },
  { name: 'Medium Rectangle', width: 300, height: 250 },
  { name: 'Wide Skyscraper', width: 160, height: 600 },
  { name: 'Half Page', width: 300, height: 600 },
  { name: 'Mobile Leaderboard', width: 320, height: 50 },
];

export const ASPECT_RATIOS: AspectRatio[] = ["1:1", "4:3", "16:9", "3:4", "9:16"];
