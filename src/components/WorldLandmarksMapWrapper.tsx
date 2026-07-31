'use client';

import dynamic from 'next/dynamic';

const WorldLandmarksMap = dynamic(
  () => import('./WorldLandmarksMap'),
  { ssr: false }
);

export default function WorldLandmarksMapWrapper() {
  return <WorldLandmarksMap />;
}
