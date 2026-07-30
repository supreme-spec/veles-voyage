'use client';

import { useEffect } from 'react';

export default function ChunkLoadRecovery() {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      const msg = event.message || '';
      if (
        msg.includes('ChunkLoadError') ||
        msg.includes('Loading chunk') ||
        msg.includes('Failed to fetch dynamically imported module')
      ) {
        console.warn('[ChunkLoadRecovery] Reloading after chunk load failure:', msg);
        window.location.reload();
      }
    };

    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  return null;
}
