
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center my-10" aria-label="Loading, please wait.">
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-lg text-gray-300 font-semibold">Generating your ads...</p>
        <p className="text-sm text-gray-500">This may take a moment. The AI is crafting your image and copy.</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
