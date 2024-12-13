import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function HandleSetup() {
  const { setCustomMetadata } = usePrivy();
  const [handle, setHandle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!handle.match(/^[a-zA-Z0-9_]{3,20}$/)) {
        throw new Error('Handle must be 3-20 characters and can only contain letters, numbers, and underscores');
      }

      await setCustomMetadata({
        handle: handle.toLowerCase(),
        handleCreatedAt: Date.now()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set handle');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-purple-500 rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">
          Choose your handle
        </h1>
        <p className="text-yellow-300/80 mb-12">
          This will be your unique identifier
        </p>

        <form onSubmit={handleSubmit}>
          <div className="bg-yellow-300 rounded-full p-4 relative">
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full bg-transparent text-black text-xl pl-8 placeholder-black/50 outline-none"
              placeholder="username"
              disabled={isLoading}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-black text-xl">@</span>
          </div>

          {error && (
            <p className="mt-3 text-red-300 text-sm px-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !handle}
            className="w-full mt-8 py-4 bg-yellow-300 text-black text-xl font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}