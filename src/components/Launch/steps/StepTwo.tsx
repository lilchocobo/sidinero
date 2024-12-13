import React from 'react';
import { TokenDetails } from '../../../types';

interface StepTwoProps {
  tokenDetails: TokenDetails;
  setTokenDetails: (details: TokenDetails) => void;
  onNext: () => void;
}

export function StepTwo({ tokenDetails, setTokenDetails, onNext }: StepTwoProps) {
  // Local state for image preview
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set the File object in tokenDetails
      setTokenDetails({ ...tokenDetails, image: file });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenDetails.name && tokenDetails.ticker && tokenDetails.image) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 px-6">
        <h2 className="text-3xl font-bold text-yellow-300 text-center mb-12">
          Add in your token's details
        </h2>
        
        <div className="mb-8">
          <div 
            className="w-48 h-48 rounded-full bg-yellow-300 mx-auto mb-4 flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={() => document.getElementById('tokenImage')?.click()}
          >
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Token" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl">+</span>
                <span className="text-xs">Token Image</span>
              </div>
            )}
          </div>
          <input
            id="tokenImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Token Name"
            value={tokenDetails.name}
            onChange={(e) => setTokenDetails({ ...tokenDetails, name: e.target.value })}
            className="w-full p-4 rounded-full bg-yellow-300 text-black placeholder-black/70 text-lg"
          />
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black text-lg">$</span>
            <input
              type="text"
              placeholder="Ticker"
              value={tokenDetails.ticker}
              onChange={(e) => setTokenDetails({ ...tokenDetails, ticker: e.target.value })}
              className="w-full p-4 pl-8 rounded-full bg-yellow-300 text-black placeholder-black/70 text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={!tokenDetails.name || !tokenDetails.ticker}
            className="w-full py-4 px-6 bg-yellow-300 text-black text-xl font-bold rounded-full hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Review
          </button>
        </form>
      </div>
    </div>
  );
}