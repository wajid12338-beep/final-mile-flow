import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface RouteMapProps {
  pickup?: { lat: number; lng: number };
  delivery?: { lat: number; lng: number };
  className?: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ pickup, delivery, className = "" }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Get Google Maps API key
  useEffect(() => {
    const getApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        if (!error && data?.key) {
          setApiKey(data.key);
        }
      } catch (error) {
        console.error('Error getting Google Maps API key:', error);
      }
    };
    getApiKey();
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) return;

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapContainer.current || map.current) return;

    map.current = new google.maps.Map(mapContainer.current, {
      center: { lat: 52.5, lng: -1.5 }, // UK center
      zoom: 7,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    directionsService.current = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#ff6b35',
        strokeWeight: 4,
        strokeOpacity: 0.8,
      },
    });
    
    directionsRenderer.current.setMap(map.current);
  }, [isLoaded]);

  // Calculate and display route
  useEffect(() => {
    if (!map.current || !directionsService.current || !directionsRenderer.current || !pickup || !delivery) return;

    const request: google.maps.DirectionsRequest = {
      origin: { lat: pickup.lat, lng: pickup.lng },
      destination: { lat: delivery.lat, lng: delivery.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.current.route(request, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.current?.setDirections(result);
      } else {
        console.error('Directions request failed due to:', status);
      }
    });
  }, [pickup, delivery, isLoaded]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      {(!pickup || !delivery) && (
        <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Enter pickup and delivery addresses to see route</p>
        </div>
      )}
    </div>
  );
};

export default RouteMap;