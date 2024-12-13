import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
      {isSignIn ? (
        <SignInForm onToggleForm={() => setIsSignIn(false)} />
      ) : (
        <SignUpForm onToggleForm={() => setIsSignIn(true)} />
      )}
    </div>
  );
}