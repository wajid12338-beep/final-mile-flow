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
  // Base pricing structure similar to Onit Logistics
  let baseRate = 25; // Base collection fee
  let perMileRate = 1.5; // Per mile rate
  
  // Vehicle type multipliers
  const vehicleMultipliers: Record<string, number> = {
    "Small Van": 1.0,
    "SWB Van (Short Wheelbase)": 1.2,
    "LWB Van (Long Wheelbase)": 1.4,
    "XLWB Van (Extra-Long Wheelbase)": 1.6,
    "Luton Van": 1.8
  };
  
  const vehicleMultiplier = vehicleType ? (vehicleMultipliers[vehicleType] || 1.0) : 1.0;
  
  // Service type multipliers
  const serviceMultipliers: { [key: string]: number } = {
    "Same Day Courier": 1.0,
    "Next Day Courier": 0.8,
    "Multi-Drop Courier": 1.3,
    "Van Day Rate Service": 2.0,
    "Overnight Service": 1.2
  };
  
  // Package size multipliers based on description
  let packageMultiplier = 1.0;
  const desc = description.toLowerCase();
  if (desc.includes('large') || desc.includes('van') || desc.includes('boxes')) {
    packageMultiplier = 1.2;
  }
  if (desc.includes('small') || desc.includes('document') || desc.includes('envelope')) {
    packageMultiplier = 0.8;
  }
  
  const serviceMultiplier = serviceMultipliers[serviceType] || 1.0;
  
  const collection = baseRate * vehicleMultiplier;
  const delivery = Math.round((distance * perMileRate * serviceMultiplier * packageMultiplier * vehicleMultiplier) * 100) / 100;
  const price = collection + delivery;
  const vat = Math.round(price * 0.2 * 100) / 100;
  const total = Math.round((price + vat) * 100) / 100;
  
  return {
    collection,
    delivery,
    price,
    vat,
    total
  };
};