'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user has already been verified in this session
    const verified = sessionStorage.getItem('ageVerified');
    if (verified === 'true') {
      onVerified();
    }
  }, [onVerified]);

  const handleConfirm = () => {
    setIsVerified(true);
    sessionStorage.setItem('ageVerified', 'true');
    setTimeout(() => {
      onVerified();
    }, 1000);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) {
    return (
      <div className="fixed inset-0 bg-primary-950 flex items-center justify-center z-50">
        <div className="text-center animate-fade-in">
          <Shield className="h-16 w-16 text-accent-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-semibold text-gray-100 mb-2">
            Welcome to Demo Smoke
          </h2>
          <p className="text-gray-400">Redirecting you to our store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-primary-950 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full glass-effect rounded-2xl p-8 animate-slide-up">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            Demo Smoke
          </h1>
          <p className="text-gray-400 text-sm">
            Premium Smoke Shop & Accessories
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 p-4 bg-accent-950/30 border border-accent-800/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-accent-400 flex-shrink-0" />
            <p className="text-sm text-gray-300">
              This website contains tobacco and related products. You must be 21 or older to enter.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-display font-semibold text-gray-100 mb-4">
              Are you 21 years of age or older?
            </h3>
            <p className="text-gray-400 text-sm">
              You must be of legal age to view this website.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExit}
            className="flex-1 btn-secondary"
          >
            No, I am under 21
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 btn-primary"
          >
            Yes, I am 21+
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By entering this site, you acknowledge you are of legal age and agree to our terms of service.
        </p>
      </div>
    </div>
  );
} 