/**
 * Trust score service
 * calculate landlord credibility 0-100 scale
 */

const calculateTrustScore = (landlord, reviews = []) => {
  let score = 50; // Start at 50

  // factor 1 - landlord verification
  if (landlord.isVerified) score += 20;
  // factor 2 - review ratings max cap +20
  if (reviews.length > 0) {
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    score += (avgRating - 3) * 10; // above 3 stars adds to score, below reduces
  }
  // factor 3 - review count max cap +10
  if (reviews.length >= 10) score += 10;
  else if (reviews.length >= 5) score += 5;
  else if (reviews.length >= 1) score += 2;

  return Math.min(100, Math.max(0, score));
};
module.exports = { calculateTrustScore };
