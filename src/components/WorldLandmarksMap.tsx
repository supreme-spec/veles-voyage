'use client';

import { useState, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

interface Landmark {
  id: number;
  name: string;
  country: string;
  type: 'wonder' | 'nature' | 'city' | 'culture' | 'religion';
  coordinates: [number, number];
  description: string;
  emoji: string;
}

const WORLD_LANDMARKS: Landmark[] = [
  { id: 1, name: 'Великая Китайская стена', country: 'Китай', type: 'wonder', coordinates: [116.5704, 40.4319], description: 'Древнейшее оборонительное сооружение', emoji: '🏯' },
  { id: 2, name: 'Мачу-Пикчу', country: 'Перу', type: 'wonder', coordinates: [-72.5450, -13.1631], description: 'Затерянный город инков', emoji: '🏔️' },
  { id: 3, name: 'Колизей', country: 'Италия', type: 'wonder', coordinates: [12.4924, 41.8902], description: 'Амфитеатр Древнего Рима', emoji: '🏛️' },
  { id: 4, name: 'Тадж-Махал', country: 'Индия', type: 'wonder', coordinates: [78.0421, 27.1751], description: 'Мавзолей-мечеть из белого мрамора', emoji: '🕌' },
  { id: 5, name: 'Петра', country: 'Иордания', type: 'wonder', coordinates: [35.4444, 30.3285], description: 'Город, высеченный в скалах', emoji: '🏜️' },
  { id: 6, name: 'Статуя Христа', country: 'Бразилия', type: 'wonder', coordinates: [-43.2105, -22.9519], description: 'Символ Рио-де-Жанейро', emoji: '⛪' },
  { id: 7, name: 'Чичен-Ица', country: 'Мексика', type: 'wonder', coordinates: [-88.5686, 20.6843], description: 'Пирамида майя', emoji: '🔺' },
  { id: 8, name: 'Гранд-Каньон', country: 'США', type: 'nature', coordinates: [-112.1401, 36.0544], description: 'Величайший каньон мира', emoji: '🏜️' },
  { id: 9, name: 'Водопад Виктория', country: 'Замбия/Зимбабве', type: 'nature', coordinates: [25.8543, -17.9243], description: 'Крупнейший водопад Африки', emoji: '💧' },
  { id: 10, name: 'Большой Барьерный риф', country: 'Австралия', type: 'nature', coordinates: [147.6992, -18.2871], description: 'Крупнейшая коралловая система', emoji: '🐠' },
  { id: 11, name: 'Фьорды Норвегии', country: 'Норвегия', type: 'nature', coordinates: [6.8482, 61.2176], description: 'Гейрангер-фьорд', emoji: '🏔️' },
  { id: 12, name: 'Байкал', country: 'Россия', type: 'nature', coordinates: [107.5, 53.5], description: 'Глубочайшее озеро мира', emoji: '🌊' },
  { id: 13, name: 'Эйфелева башня', country: 'Франция', type: 'city', coordinates: [2.2945, 48.8584], description: 'Символ Парижа', emoji: '🗼' },
  { id: 14, name: 'Айя-София', country: 'Турция', type: 'culture', coordinates: [28.9802, 41.0086], description: 'Величайший памятник Византии', emoji: '🕌' },
  { id: 15, name: 'Ангкор-Ват', country: 'Камбоджа', type: 'culture', coordinates: [103.8670, 13.4125], description: 'Крупнейший храмовый комплекс', emoji: '🛕' },
  { id: 16, name: 'Кремль', country: 'Россия', type: 'culture', coordinates: [37.6173, 55.7520], description: 'Сердце Москвы', emoji: '🏰' },
  { id: 17, name: 'Акрополь', country: 'Греция', type: 'culture', coordinates: [23.7267, 37.9715], description: 'Колыбель демократии', emoji: '🏛️' },
  { id: 18, name: 'Бурдж-Халифа', country: 'ОАЭ', type: 'city', coordinates: [55.2744, 25.1972], description: 'Высочайшее здание мира', emoji: '🏙️' },
  { id: 19, name: 'Сагра́да Фами́лия', country: 'Испания', type: 'culture', coordinates: [2.1744, 41.4036], description: 'Шедевр Гауди', emoji: '⛪' },
  { id: 20, name: 'Каппадокия', country: 'Турция', type: 'nature', coordinates: [34.8303, 38.6431], description: 'Полёты на шарах над скалами', emoji: '🎈' },
];

const TYPE_COLORS: Record<string, string> = {
  wonder: '#ef4444',
  nature: '#22c55e',
  city: '#3b82f6',
  culture: '#a855f7',
  religion: '#f59e0b',
};

export default function WorldLandmarksMap() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredLandmarks = useMemo(() => {
    return activeFilter === 'all'
      ? WORLD_LANDMARKS
      : WORLD_LANDMARKS.filter((l) => l.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        {[
          { key: 'all', label: '🌍 Все' },
          { key: 'wonder', label: '🏛️ Чудеса' },
          { key: 'nature', label: '🌿 Природа' },
          { key: 'city', label: '🏙️ Города' },
          { key: 'culture', label: '🎭 Культура' },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all ${
              activeFilter === filter.key
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <Map
        initialViewState={{ longitude: 20, latitude: 30, zoom: 2 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        mapLib={maplibregl}
      >
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />

        {filteredLandmarks.map((landmark) => (
          <Marker
            key={landmark.id}
            longitude={landmark.coordinates[0]}
            latitude={landmark.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedLandmark(landmark);
            }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-transform hover:scale-125 border-2 border-white"
              style={{ backgroundColor: TYPE_COLORS[landmark.type] + '20' }}
              title={landmark.name}
            >
              <span className="text-sm">{landmark.emoji}</span>
            </div>
          </Marker>
        ))}

        {selectedLandmark && (
          <Popup
            longitude={selectedLandmark.coordinates[0]}
            latitude={selectedLandmark.coordinates[1]}
            anchor="bottom"
            onClose={() => setSelectedLandmark(null)}
            closeOnClick={false}
            className="rounded-xl"
          >
            <div className="p-3 min-w-[200px]">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {selectedLandmark.emoji} {selectedLandmark.name}
              </h3>
              <p className="text-xs text-gray-500 mb-1">{selectedLandmark.country}</p>
              <p className="text-xs text-gray-700">{selectedLandmark.description}</p>
              <a
                href={`/wiki/${selectedLandmark.country.toLowerCase()}`}
                className="inline-block mt-2 text-xs font-bold text-blue-600 hover:underline"
              >
                Путеводитель →
              </a>
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute bottom-2 left-2 z-10 text-[10px] text-gray-500 bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded">
        MapLibre | OpenFreeMap © OpenMapTiles | Data from OpenStreetMap
      </div>
    </div>
  );
}
