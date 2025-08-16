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

  // Get Google Maps API key and load script
  useEffect(() => {
    const loadGoogleMapsWithKey = async () => {
      try {
        // Skip if Google Maps is already loaded
        if (window.google && window.google.maps) {
          setIsLoaded(true);
          return;
        }

        // Get API key from our edge function
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        if (error || !data?.key) {
          console.error('Error getting Google Maps API key:', error);
          return;
        }

        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);
        script.onerror = () => console.error('Failed to load Google Maps script');
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMapsWithKey();
  }, []);

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
      draggable: false,
      polylineOptions: {
        strokeColor: '#ff6b35',
        strokeWeight: 4,
        strokeOpacity: 0.8,
        geodesic: false
      },
      markerOptions: {
        draggable: false
      }
    });
    
    directionsRenderer.current.setMap(map.current);
    console.log('=== DEBUG: DirectionsRenderer initialized and set to map');
  }, [isLoaded]);

  // Calculate and display route
  useEffect(() => {
    if (!map.current || !directionsService.current || !directionsRenderer.current || !pickup || !delivery) {
      console.log('=== DEBUG: Route calculation skipped - missing dependencies:', {
        hasMap: !!map.current,
        hasDirectionsService: !!directionsService.current,
        hasDirectionsRenderer: !!directionsRenderer.current,
        hasPickup: !!pickup,
        hasDelivery: !!delivery
      });
      return;
    }

    console.log('=== DEBUG: Calculating route from', pickup, 'to', delivery);

    const request: google.maps.DirectionsRequest = {
      origin: { lat: pickup.lat, lng: pickup.lng },
      destination: { lat: delivery.lat, lng: delivery.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.current.route(request, (result, status) => {
      console.log('=== DEBUG: Directions API response:', { status, result });
      if (status === 'OK' && result) {
        console.log('=== DEBUG: Route found, displaying on map');
        console.log('=== DEBUG: Route details:', result.routes[0]?.overview_polyline);
        directionsRenderer.current?.setDirections(result);
        console.log('=== DEBUG: setDirections called successfully');
      } else {
        console.error('=== DEBUG: Directions request failed:', status);
        // Show error details
        if (status === 'REQUEST_DENIED') {
          console.error('=== DEBUG: REQUEST_DENIED - Check if Directions API is enabled');
        } else if (status === 'OVER_QUERY_LIMIT') {
          console.error('=== DEBUG: OVER_QUERY_LIMIT - API quota exceeded');
        } else if (status === 'ZERO_RESULTS') {
          console.error('=== DEBUG: ZERO_RESULTS - No route found between points');
        }
      }
    });
  }, [pickup, delivery, isLoaded]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg min-h-[400px]" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      )}
      {(!pickup || !delivery) && isLoaded && (
        <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Enter pickup and delivery addresses to see route</p>
        </div>
      )}
    </div>
  );
};

export default RouteMap;