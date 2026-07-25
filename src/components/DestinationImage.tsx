'use client';

interface DestinationImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function DestinationImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = ''
}: DestinationImageProps) {
  if (!src) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-r from-teal-500 to-blue-600 ${className}`}
        style={{ minHeight: '100%', minWidth: '100%' }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover w-full h-full ${className}`}
      style={{ minHeight: '100%', minWidth: '100%' }}
    />
  );
}
