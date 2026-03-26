export const PRICING = {
  baseKm: 10,
  basePrice: 2000,
  extraPerKm: 100,
  waitingPerMin: 50,
  initialFreeMin: 15,
  initialBlockPrice: 300,
};

export function calculateFare(
  distanceKm: number,
  initialWaitSec: number,
  tripWaitSec: number,
) {
  let fare = PRICING.basePrice;

  if (distanceKm > PRICING.baseKm) {
    fare += (distanceKm - PRICING.baseKm) * PRICING.extraPerKm;
  }

  const initialMin = Math.floor(initialWaitSec / 60);
  if (initialMin > PRICING.initialFreeMin) {
    const blocks = Math.ceil((initialMin - PRICING.initialFreeMin) / 15);
    fare += blocks * PRICING.initialBlockPrice;
  }

  const waitingMin = Math.floor(tripWaitSec / 60);
  fare += waitingMin * PRICING.waitingPerMin;

  return fare;
}
