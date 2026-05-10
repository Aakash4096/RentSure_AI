/**
 * Safety Score Service
 * Calculates safety rating (0-100) for properties
 */

// Known safe locations
const safeLocations = [
  { name: "MNIT Jaipur", lat: 26.8625, lng: 75.809 },
  { name: "Police Station", lat: 26.861, lng: 75.81 },
  { name: "Hospital", lat: 26.86, lng: 75.808 },
];

// Calculate distance between two points in km
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth radius
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calculate safety score
const calculateSafetyScore = (propertyLat, propertyLng, amenities) => {
  let score = 50; // Start at 50

  // Proximity to safe locations
  let nearestSafeDistance = Infinity;
  safeLocations.forEach((location) => {
    const distance = getDistance(
      propertyLat,
      propertyLng,
      location.lat,
      location.lng,
    );
    if (distance < nearestSafeDistance) {
      nearestSafeDistance = distance;
    }
  });

  if (nearestSafeDistance < 0.5) score += 25;
  else if (nearestSafeDistance < 1) score += 20;
  else if (nearestSafeDistance < 2) score += 15;
  else if (nearestSafeDistance < 5) score += 10;

  // Security amenities
  if (amenities) {
    if (amenities.includes("CCTV")) score += 5;
    if (amenities.includes("Security Guard")) score += 5;
    if (amenities.includes("Gated Community")) score += 5;
  }

  return Math.min(100, Math.max(0, score));
};

module.exports = { calculateSafetyScore, getDistance };
