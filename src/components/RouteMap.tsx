import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface RouteMapProps {
  pickup?: { lat: number; lng: number };
  delivery?: { lat: number; lng: number };
  className?: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ pickup, delivery, className = "" }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with demo token - replace with your own Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNsMnZlemtlYzAwcXEzZG1uaWxlbXFtNnIifQ.OKzgqBRcJGR0lQ-6V7x_1A';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-1.5, 52.5], // UK center
      zoom: 7,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
      }),
      'top-right'
    );

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !pickup || !delivery) return;

    // Clear existing markers and routes
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add pickup marker
    new mapboxgl.Marker({ color: '#22c55e' })
      .setLngLat([pickup.lng, pickup.lat])
      .setPopup(new mapboxgl.Popup().setHTML('<div class="text-sm font-medium">Pickup Location</div>'))
      .addTo(map.current);

    // Add delivery marker
    new mapboxgl.Marker({ color: '#ef4444' })
      .setLngLat([delivery.lng, delivery.lat])
      .setPopup(new mapboxgl.Popup().setHTML('<div class="text-sm font-medium">Delivery Location</div>'))
      .addTo(map.current);

    // Fit map to show both points
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([pickup.lng, pickup.lat]);
    bounds.extend([delivery.lng, delivery.lat]);
    
    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 12
    });

    // Get route from Mapbox Directions API
    const getRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lng},${pickup.lat};${delivery.lng},${delivery.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;
          
          // Add route to map
          if (map.current?.getSource('route')) {
            (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
          } else {
            map.current?.addSource('route', {
              type: 'geojson',
              data: route
            });
            
            map.current?.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#ff6b35',
                'line-width': 4,
                'line-opacity': 0.8
              }
            });
          }
        }
      } catch (error) {
        console.error('Error getting route:', error);
      }
    };

    map.current.on('load', getRoute);
    if (map.current.isStyleLoaded()) {
      getRoute();
    }
  }, [pickup, delivery]);

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