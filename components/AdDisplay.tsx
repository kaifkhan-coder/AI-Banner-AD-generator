
import React from 'react';
import { AdData } from '../types';
import BannerAd from './BannerAd';

interface AdDisplayProps {
  ads: AdData[];
}

const AdDisplay: React.FC<AdDisplayProps> = ({ ads }) => {
  return (
    <div className="flex flex-wrap justify-center items-start gap-8">
      {ads.map((ad) => (
        <div key={ad.name} className="flex flex-col items-center gap-3">
          <h3 className="font-semibold text-gray-400">{ad.name} ({ad.width} x {ad.height})</h3>
          <BannerAd ad={ad} />
        </div>
      ))}
    </div>
  );
};

export default AdDisplay;
