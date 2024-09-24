import { useState, useEffect } from 'react';

// Custom hook to load a CSS file dynamically
export const useCSSHook = (href) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    link.onload = () => setLoaded(true);
    link.onerror = () => setError(true);

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Clean up on unmount
    };
  }, [href]);

  return { loaded, error };
};
