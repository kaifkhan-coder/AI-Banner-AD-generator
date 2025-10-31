
import React, { useState, useCallback } from 'react';
import AdGeneratorForm from './components/AdGeneratorForm';
import AdDisplay from './components/AdDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateAds } from './services/geminiService';
import { AdData, AspectRatio } from './types';
import { GemIcon } from './components/icons';

const App: React.FC = () => {
  const [adData, setAdData] = useState<AdData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAds = useCallback(async (description: string, url: string, aspectRatio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    setAdData([]);
    try {
      const results = await generateAds(description, url, aspectRatio);
      setAdData(results);
    } catch (err) {
      console.error('Error generating ads:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and ensure your API key is configured correctly.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <GemIcon className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              AI Banner Ad Generator
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Instantly create a full suite of professional banner ads. Just provide a product description, and let AI handle the rest.
          </p>
        </header>

        <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700">
          <AdGeneratorForm onGenerate={handleGenerateAds} isLoading={isLoading} />
        </div>

        {isLoading && <LoadingSpinner />}
        
        {error && (
          <div className="text-center my-10 max-w-2xl mx-auto p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">
            <h3 className="font-bold mb-2">Generation Failed</h3>
            <p>{error}</p>
          </div>
        )}

        {adData.length > 0 && !isLoading && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Your Generated Ads</h2>
            <AdDisplay ads={adData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
