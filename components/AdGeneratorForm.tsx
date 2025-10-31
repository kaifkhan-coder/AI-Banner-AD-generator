
import React, { useState } from 'react';
import { ASPECT_RATIOS } from '../constants';
import { AspectRatio } from '../types';
import { SparklesIcon } from './icons';

interface AdGeneratorFormProps {
  onGenerate: (description: string, url:string, aspectRatio: AspectRatio) => void;
  isLoading: boolean;
}

const AdGeneratorForm: React.FC<AdGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && url.trim()) {
      onGenerate(description, url, aspectRatio);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Product Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500"
          placeholder="e.g., An ergonomic office chair with lumbar support, made from sustainable materials."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            Product URL
          </label>
          <input
            type="url"
            id="url"
            className="w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500"
            placeholder="https://example.com/product"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">
            Image Aspect Ratio
          </label>
          <select
            id="aspectRatio"
            className="w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
          >
            {ASPECT_RATIOS.map((ratio) => (
              <option key={ratio} value={ratio}>
                {ratio}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !description.trim() || !url.trim()}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generate Ads
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdGeneratorForm;
