// Utility helper functions

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate distance between two lat/lng coordinates using Haversine formula (in km)
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100;
}

/**
 * Calculate estimated walking time in minutes (assuming average walking speed 4.8 km/h)
 */
export function calculateWalkingMinutes(distanceKm: number): number {
  const walkingSpeedKmPerHr = 4.8;
  const minutes = (distanceKm / walkingSpeedKmPerHr) * 60;
  return Math.ceil(minutes);
}

/**
 * Generate UPI Intent / Payment QR string
 */
export function generateUpiUri(upiId: string, name: string, amount: number, orderId: string): string {
  const encodedName = encodeURIComponent(name);
  const encodedNote = encodeURIComponent(`DeliveryToClass Order ${orderId}`);
  return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=INR&tn=${encodedNote}`;
}

/**
 * Get readable order status label and color badge class
 */
export function getStatusBadge(status: string): { label: string; bgClass: string; textClass: string } {
  switch (status) {
    case 'PLACED':
      return { label: 'Order Placed', bgClass: 'bg-amber-100 dark:bg-amber-900/40', textClass: 'text-amber-800 dark:text-amber-300' };
    case 'ACCEPTED_BY_SHOP':
      return { label: 'Shop Accepted', bgClass: 'bg-blue-100 dark:bg-blue-900/40', textClass: 'text-blue-800 dark:text-blue-300' };
    case 'PREPARING':
      return { label: 'Preparing Food/Items', bgClass: 'bg-purple-100 dark:bg-purple-900/40', textClass: 'text-purple-800 dark:text-purple-300' };
    case 'READY_FOR_PICKUP':
      return { label: 'Ready for Pickup', bgClass: 'bg-orange-100 dark:bg-orange-900/40', textClass: 'text-orange-800 dark:text-orange-300' };
    case 'ACCEPTED_BY_PARTNER':
      return { label: 'Partner Assigned', bgClass: 'bg-indigo-100 dark:bg-indigo-900/40', textClass: 'text-indigo-800 dark:text-indigo-300' };
    case 'PICKED_UP':
      return { label: 'On the Way to Class', bgClass: 'bg-sky-100 dark:bg-sky-900/40', textClass: 'text-sky-800 dark:text-sky-300' };
    case 'DELIVERED':
      return { label: 'Delivered to Class', bgClass: 'bg-emerald-100 dark:bg-emerald-900/40', textClass: 'text-emerald-800 dark:text-emerald-300' };
    case 'CANCELLED':
      return { label: 'Cancelled', bgClass: 'bg-rose-100 dark:bg-rose-900/40', textClass: 'text-rose-800 dark:text-rose-300' };
    default:
      return { label: status, bgClass: 'bg-gray-100 dark:bg-gray-800', textClass: 'text-gray-800 dark:text-gray-200' };
  }
}
