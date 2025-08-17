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
  const pickupMarker = useRef<google.maps.Marker | null>(null);
  const deliveryMarker = useRef<google.maps.Marker | null>(null);
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
      zoom: 8, // Lower zoom level to show more area
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy', // Allow all gestures
    });

    directionsService.current = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // We'll add custom markers
      draggable: false,
      polylineOptions: {
        strokeColor: '#ff6b35',
        strokeWeight: 4,
        strokeOpacity: 0.8,
      }
    });
    
    directionsRenderer.current.setMap(map.current);
  }, [isLoaded]);

  // Calculate and display route
  useEffect(() => {
    if (!map.current || !directionsService.current || !directionsRenderer.current || !pickup || !delivery) {
      console.log('=== DEBUG: Missing requirements:', {
        map: !!map.current,
        directionsService: !!directionsService.current,
        directionsRenderer: !!directionsRenderer.current,
        pickup: !!pickup,
        delivery: !!delivery
      });
      return;
    }

    // Validate that map.current is actually a Google Maps instance
    if (!map.current.getCenter) {
      console.error('=== DEBUG: map.current is not a valid Google Maps instance');
      return;
    }

    console.log('=== DEBUG: Calculating route from', pickup, 'to', delivery);

    const request: google.maps.DirectionsRequest = {
      origin: { lat: pickup.lat, lng: pickup.lng },
      destination: { lat: delivery.lat, lng: delivery.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.current.route(request, (result, status) => {
      console.log('=== DEBUG: Directions API response:', { status });
      if (status === 'OK' && result) {
        console.log('=== DEBUG: Route found, displaying on map');
        
        // Double-check map is still valid before proceeding
        if (!map.current || !map.current.getCenter) {
          console.error('=== DEBUG: Map became invalid during directions callback');
          return;
        }

        // Clear existing markers first
        if (pickupMarker.current) {
          console.log('=== DEBUG: Clearing existing pickup marker');
          try {
            pickupMarker.current.setMap(null);
          } catch (e) {
            console.error('=== DEBUG: Error clearing pickup marker:', e);
          }
          pickupMarker.current = null;
        }
        if (deliveryMarker.current) {
          console.log('=== DEBUG: Clearing existing delivery marker');
          try {
            deliveryMarker.current.setMap(null);
          } catch (e) {
            console.error('=== DEBUG: Error clearing delivery marker:', e);
          }
          deliveryMarker.current = null;
        }

        // Set the directions (this will draw the route line)
        try {
          directionsRenderer.current?.setDirections(result);
          console.log('=== DEBUG: Route line displayed');
        } catch (e) {
          console.error('=== DEBUG: Error setting directions:', e);
          return;
        }

        // Create pickup marker (green with "A") - with error handling
        console.log('=== DEBUG: Creating pickup marker at:', pickup);
        try {
          pickupMarker.current = new google.maps.Marker({
            position: { lat: pickup.lat, lng: pickup.lng },
            map: map.current,
            title: 'Pickup Location - A',
            label: {
              text: 'A',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#22c55e', // Green
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 15
            },
            zIndex: 1000 // Ensure it's on top
          });
          console.log('=== DEBUG: Pickup marker created successfully');
        } catch (e) {
          console.error('=== DEBUG: Error creating pickup marker:', e);
        }

        // Create delivery marker (red with "B") - with error handling
        console.log('=== DEBUG: Creating delivery marker at:', delivery);
        try {
          deliveryMarker.current = new google.maps.Marker({
            position: { lat: delivery.lat, lng: delivery.lng },
            map: map.current,
            title: 'Delivery Location - B',
            label: {
              text: 'B',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#ef4444', // Red
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 15
            },
            zIndex: 1000 // Ensure it's on top
          });
          console.log('=== DEBUG: Delivery marker created successfully');
        } catch (e) {
          console.error('=== DEBUG: Error creating delivery marker:', e);
        }
        
        console.log('=== DEBUG: Route and markers setup complete');
        
      } else {
        console.error('=== DEBUG: Directions request failed:', status);
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