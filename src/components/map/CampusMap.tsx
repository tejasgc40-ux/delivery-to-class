'use client';

import React, { useEffect, useState } from 'react';
import { Shop } from '../../types';
import { calculateDistanceKm, calculateWalkingMinutes } from '../../lib/utils';
import { MapPin, Navigation, Compass, Layers, Phone } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface CampusMapProps {
  shops?: Shop[];
  userLat?: number;
  userLng?: number;
  selectedShopId?: string;
  onSelectShop?: (shop: Shop) => void;
  courierLat?: number;
  courierLng?: number;
  courierName?: string;
  destinationLat?: number;
  destinationLng?: number;
  height?: string;
}

export const CampusMapContent: React.FC<CampusMapProps> = ({
  shops = [],
  userLat = 12.9725,
  userLng = 77.5950,
  selectedShopId,
  onSelectShop,
  courierLat,
  courierLng,
  courierName = 'Student Courier',
  destinationLat,
  destinationLng,
  height = '400px'
}) => {
  const [LState, setLState] = useState<any>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: userLat, lng: userLng });
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    // Dynamic client-side import for Leaflet
    import('leaflet').then((L) => {
      // Fix default Leaflet icon paths in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setLState(L);
    });
  }, []);

  useEffect(() => {
    if (!LState) return;

    const mapContainer = document.getElementById('leaflet-campus-map');
    if (!mapContainer) return;

    // Cleanup existing instance
    if (mapInstance) {
      mapInstance.remove();
    }

    const map = LState.map('leaflet-campus-map', {
      center: [userLocation.lat, userLocation.lng],
      zoom: 16,
      zoomControl: true
    });

    // Add OpenStreetMap Tile Layer
    LState.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Icons
    const userIcon = LState.divIcon({
      className: 'custom-user-pin',
      html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.6); display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const shopIcon = LState.divIcon({
      className: 'custom-shop-pin',
      html: `<div style="background-color: #f97316; color: white; width: 32px; height: 32px; border-radius: 12px; border: 2px solid white; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">🛍️</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    const courierIcon = LState.divIcon({
      className: 'custom-courier-pin',
      html: `<div style="background-color: #10b981; color: white; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(16, 185, 129, 0.6); display: flex; align-items: center; justify-content: center; font-size: 18px;" class="animate-bounce">🚴</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const destinationIcon = LState.divIcon({
      className: 'custom-dest-pin',
      html: `<div style="background-color: #8b5cf6; color: white; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 16px;">🏫</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    // Add User location marker
    LState.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<b>You Are Here</b><br>Campus Location');

    // Add Shop markers
    shops.forEach((shop) => {
      const distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lng, shop.lat, shop.lng);
      const walkMin = calculateWalkingMinutes(distanceKm);

      const marker = LState.marker([shop.lat, shop.lng], { icon: shopIcon }).addTo(map);
      
      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px;">
          <h4 style="margin: 0 0 4px 0; font-weight: bold; color: #0f172a; font-size: 13px;">${shop.name}</h4>
          <p style="margin: 0; font-size: 11px; color: #64748b;">${shop.category} • ${shop.campusBuilding}</p>
          <div style="display: flex; gap: 8px; margin-top: 6px; font-size: 11px; font-weight: 600;">
            <span style="color: #f97316;">⭐ ${shop.rating}</span>
            <span style="color: #2563eb;">🚶 ${walkMin} mins walk (${Math.round(distanceKm * 1000)}m)</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      if (onSelectShop) {
        marker.on('click', () => onSelectShop(shop));
      }
    });

    // Add Courier Marker & Polyline route if live tracking
    if (courierLat && courierLng) {
      const courierMarker = LState.marker([courierLat, courierLng], { icon: courierIcon }).addTo(map);
      courierMarker.bindPopup(`<b>${courierName}</b><br>On the way to deliver!`).openPopup();

      if (destinationLat && destinationLng) {
        LState.marker([destinationLat, destinationLng], { icon: destinationIcon })
          .addTo(map)
          .bindPopup('<b>Classroom Delivery Point</b>');

        // Draw dotted route polyline
        const routePoints = [
          [courierLat, courierLng],
          [destinationLat, destinationLng]
        ];
        LState.polyline(routePoints, {
          color: '#10b981',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.8
        }).addTo(map);
      }
    }

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, [LState, shops, userLocation, courierLat, courierLng]);

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (mapInstance) {
            mapInstance.setView([latitude, longitude], 17);
          }
          setIsLocating(false);
        },
        (error) => {
          console.warn('Geolocation error fallback to campus center:', error);
          setIsLocating(false);
          alert('Using default SRM Campus location.');
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
      {/* Location overlay controls */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
        <button
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="flex items-center gap-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1.5 rounded-xl shadow-md text-xs font-semibold hover:bg-slate-50 border border-slate-200 dark:border-slate-700 transition-all"
        >
          <Navigation className={`w-3.5 h-3.5 text-brand-500 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Locating...' : 'My Location'}</span>
        </button>
      </div>

      {/* Leaflet map div */}
      <div id="leaflet-campus-map" style={{ height, width: '100%' }} className="bg-slate-100 dark:bg-slate-900" />
    </div>
  );
};
