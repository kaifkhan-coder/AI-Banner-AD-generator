
import React from 'react';
import { AdData } from '../types';

interface BannerAdProps {
  ad: AdData;
}

const BannerAd: React.FC<BannerAdProps> = ({ ad }) => {
  const { width, height, imageUrl, headline, cta, productUrl, name } = ad;
  const aspectRatio = width / height;

  // Determine layout based on aspect ratio
  const isWide = aspectRatio > 1.5; // e.g., Leaderboard
  const isTall = aspectRatio < 0.7; // e.g., Skyscraper

  // Determine font sizes based on ad height to ensure readability
  let headlineSize = 'text-base';
  let ctaSize = 'text-sm';
  if (height < 100) {
    headlineSize = 'text-sm';
    ctaSize = 'text-xs';
  }
  if (height < 60) {
    headlineSize = 'text-xs';
    ctaSize = 'text-[10px]'; // Using a specific value for tiny mobile ads
  }
  if (width < 200 && height > 400) { // Skyscraper specific
      headlineSize = 'text-lg';
      ctaSize = 'text-base';
  }

  const layoutClasses = isTall
    ? 'flex-col'
    : isWide
    ? 'flex-row items-center'
    : 'flex-col';
  
  const contentPadding = height < 100 ? 'p-2' : 'p-4';

  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 shadow-lg rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
      // NOTE: Inline styles are used exclusively for setting the dynamic width and height of the ad container.
      // This is a necessary exception to the 'no-inline-styles' rule because banner ad dimensions are specific
      // and not covered by standard Tailwind classes, especially within a CDN-only environment without a config file.
      style={{ width: `${width}px`, height: `${height}px` }}
      title={`Ad: ${name}`}
    >
      <div className={`w-full h-full flex ${layoutClasses} bg-white text-gray-900`}>
        <div className={`flex-shrink-0 ${isWide ? 'w-1/3' : ''} ${isTall ? 'h-1/2' : ''} ${!isWide && !isTall ? 'h-1/2' : ''}`}>
          <img src={imageUrl} alt={headline} className="w-full h-full object-cover" />
        </div>
        <div className={`flex-grow flex flex-col justify-center items-start ${contentPadding} text-left`}>
          <h4 className={`font-bold leading-tight ${headlineSize}`}>{headline}</h4>
          <button className={`mt-auto bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors ${ctaSize} ${height < 100 ? 'px-2 py-1' : 'px-4 py-2'}`}>
            {cta}
          </button>
        </div>
      </div>
    </a>
  );
};

export default BannerAd;
