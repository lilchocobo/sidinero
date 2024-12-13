import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface SignInFormProps {
  onToggleForm: () => void;
}

export function SignInForm({ onToggleForm }: SignInFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-purple-500 rounded-3xl text-white">
      <h2 className="text-3xl font-bold text-yellow-300 mb-6">Welcome Back</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-full bg-yellow-300 text-black placeholder-black/70"
            required
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-full bg-yellow-300 text-black placeholder-black/70"
            required
          />
        </div>

        {error && (
          <div className="text-red-300 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-yellow-300 text-black font-bold rounded-full disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <button
        onClick={onToggleForm}
        className="w-full mt-4 text-yellow-300 text-sm"
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
}