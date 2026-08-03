'use client';

import { useState, useEffect } from 'react';
import WorldLandmarksMap from './WorldLandmarksMap';

export default function WorldLandmarksMapWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[650px] rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return <WorldLandmarksMap />;
}
