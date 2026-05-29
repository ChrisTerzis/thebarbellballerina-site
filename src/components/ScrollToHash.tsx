import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * After navigation to `/#section`, scroll the target into view (React Router does not do this by default).
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== '/' || !hash) return;
    const id = hash.replace(/^#/, '');
    if (!id) return;

    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const t = window.setTimeout(scroll, 50);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
