'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWeeklyPhoto, type WeeklyPhoto } from '@/shared/utils/weeklyPhoto';

interface WeeklyHeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const WeeklyHeroBackground: React.FC<WeeklyHeroBackgroundProps> = ({
  children,
  className = ''
}) => {
  const [photo, setPhoto] = useState<WeeklyPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeeklyPhoto = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/weekly-photo');
        if (response.ok) {
          const data = await response.json();
          if (data.url && data.description) {
            setPhoto({
              url: data.url,
              description: data.description,
              photographer: data.photographer || 'Unsplash',
              location: data.location || 'Неизвестное место',
              week: data.week || data.currentWeek || 1,
              year: data.year || 2026
            });
            setIsLoading(false);
            return;
          }
        }

        const fallbackPhoto = getWeeklyPhoto();
        setPhoto(fallbackPhoto);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading weekly photo:', err);
        const fallbackPhoto = getWeeklyPhoto();
        setPhoto(fallbackPhoto);
        setIsLoading(false);
      }
    };

    loadWeeklyPhoto();
  }, []);

  return (
    <section className={`relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center ${className}`}>
      {photo && (
        <div className="absolute inset-0 z-0">
          <Image
            src={photo.url}
            alt={photo.description}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            onError={() => {
              console.error('Image failed to load:', photo.url);
              setError('Не удалось загрузить фоновое изображение');
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {(!photo || error) && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 to-purple-700" />
      )}

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-gray-600 dark:text-gray-300">
            {photo ? 'Загружаем фото недели...' : 'Загрузка...'}
          </div>
        </div>
      )}

      {photo && !isLoading && (
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-xs md:text-sm bg-black/50 backdrop-blur-sm rounded-lg p-2 md:p-3">
          <p className="font-semibold">{photo.description}</p>
          <p className="opacity-90">
            📍 {photo.location} | 📷 {photo.photographer}
          </p>
        </div>
      )}

      {error && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-red-500 bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
            <div className="font-medium">⚠️ Ошибка загрузки</div>
            <div className="text-xs mt-1 opacity-90">{error}</div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};