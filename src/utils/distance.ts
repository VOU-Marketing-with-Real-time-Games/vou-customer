export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  R: number = 6371, // Bán kính Trái Đất mặc định là 6371 km
): string {
  // Hàm chuyển đổi độ sang radian
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  // Chuyển đổi tọa độ từ độ sang radian
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  // Công thức Haversine
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Tính khoảng cách
  const distance = R * c;
  return distance.toFixed(2);
}
