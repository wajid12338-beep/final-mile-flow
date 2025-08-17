// Utility functions for distance calculation and pricing
export const calculateDistance = (
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
  return R * c;
};

export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    // Using a mock geocoding for demo - in production you'd use Google Maps or Mapbox geocoding
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNsMnZlemtlYzAwcXEzZG1uaWxlbXFtNnIifQ.OKzgqBRcJGR0lQ-6V7x_1A&country=GB&limit=1`
    );
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
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
    return { collection: 0, delivery: 0, price: 0, vat: 0, total: 0 };
  }

  // Special handling for Luton Van
  if (vehicleType === "Luton Van") {
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

  return {
    collection: 0, // Not separately itemized in new pricing structure
    delivery: price,
    price,
    vat,
    total
  };
};