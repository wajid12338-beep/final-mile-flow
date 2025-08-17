// Utility functions for distance calculation and pricing
// Calculate driving distance using Google Maps Directions API
export const calculateDrivingDistance = async (
  pickup: { lat: number; lng: number },
  delivery: { lat: number; lng: number }
): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
      // Fallback to straight-line distance if Google Maps not loaded
      resolve(calculateStraightLineDistance(pickup, delivery));
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route({
      origin: { lat: pickup.lat, lng: pickup.lng },
      destination: { lat: delivery.lat, lng: delivery.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === 'OK' && result) {
        const route = result.routes[0];
        if (route && route.legs && route.legs.length > 0) {
          const distance = route.legs[0].distance;
          if (distance) {
            // Google returns distance in meters, convert to miles
            const miles = distance.value * 0.000621371;
            console.log('=== DEBUG: Google Directions distance:', distance.text, '=', miles.toFixed(2), 'miles');
            resolve(miles);
            return;
          }
        }
      }
      
      console.warn('=== DEBUG: Directions API failed, falling back to straight-line distance');
      // Fallback to straight-line distance
      resolve(calculateStraightLineDistance(pickup, delivery));
    });
  });
};

// Fallback straight-line distance calculation
export const calculateStraightLineDistance = (
  pickup: { lat: number; lng: number },
  delivery: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (delivery.lat - pickup.lat) * Math.PI / 180;
  const dLng = (delivery.lng - pickup.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pickup.lat * Math.PI / 180) * Math.cos(delivery.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distanceKm = R * c;
  // Convert to miles (1 km = 0.621371 miles)
  return distanceKm * 0.621371;
};

// Legacy function name for backward compatibility
export const calculateDistance = calculateStraightLineDistance;

export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    // Use Supabase edge function for Google Places geocoding
    const response = await fetch('https://qvrrwebgpevogwougsww.supabase.co/functions/v1/google-places-geocoding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cnJ3ZWJncGV2b2d3b3Vnc3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDA1MTEsImV4cCI6MjA3MDkxNjUxMX0.cQPR6DLxBA9Tktvekpy71J4WE-BGQziDCXyneTnPNg8`
      },
      body: JSON.stringify({ address })
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

export const calculatePricing = (
  distance: number,
  serviceType: string,
  description: string,
  vehicleType?: string
): { collection: number; delivery: number; price: number; vat: number; total: number } => {
  console.log('=== PRICING FUNCTION: Called with:', { distance, serviceType, description, vehicleType });
  
  if (!vehicleType) {
    console.log('=== PRICING FUNCTION: No vehicle type provided');
    return { collection: 0, delivery: 0, price: 0, vat: 0, total: 0 };
  }

  // Pricing structure based on your pricing sheet
  const vehiclePricing: Record<string, { baseRate: number; perMileRate: number; baseDistance: number }> = {
    "Small Van": { baseRate: 45, perMileRate: 1.15, baseDistance: 20 },
    "SWB Van (Short Wheelbase)": { baseRate: 50, perMileRate: 1.25, baseDistance: 20 },
    "LWB Van (Long Wheelbase)": { baseRate: 60, perMileRate: 1.30, baseDistance: 20 },
    "XLWB Van (Extra-Long Wheelbase)": { baseRate: 70, perMileRate: 1.70, baseDistance: 20 },
    "Luton Van": { baseRate: 0, perMileRate: 0, baseDistance: 0 } // TBC - requires specialist consultation
  };

  const pricing = vehiclePricing[vehicleType];
  
  if (!pricing) {
    console.log('=== PRICING FUNCTION: No pricing found for vehicle type:', vehicleType);
    return { collection: 0, delivery: 0, price: 0, vat: 0, total: 0 };
  }

  // Special handling for Luton Van
  if (vehicleType === "Luton Van") {
    console.log('=== PRICING FUNCTION: Luton Van requires consultation');
    return { 
      collection: 0, 
      delivery: 0, 
      price: 0, 
      vat: 0, 
      total: 0 
    };
  }

  let price = 0;
  
  if (distance <= pricing.baseDistance) {
    // Within base distance - fixed call out charge
    price = pricing.baseRate;
  } else {
    // Over base distance - base rate + per mile charge for extra miles
    const extraMiles = distance - pricing.baseDistance;
    price = pricing.baseRate + (extraMiles * pricing.perMileRate);
  }

  // Round to 2 decimal places
  price = Math.round(price * 100) / 100;
  
  // Calculate VAT at 20%
  const vat = Math.round(price * 0.2 * 100) / 100;
  const total = Math.round((price + vat) * 100) / 100;

  console.log('=== PRICING FUNCTION: Final result:', { price, vat, total });

  return {
    collection: 0, // Not separately itemized in new pricing structure
    delivery: price,
    price,
    vat,
    total
  };
};