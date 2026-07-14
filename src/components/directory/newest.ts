import type { Seller } from "../../data/mockData";

export const NEWEST_SELLER_COUNT = 4;

// "Yeni katılan işletmeler" tanımı: joinedAt tarihine göre en yeni N işletme.
// Rehberdeki ?yeni=1 filtresi ve (A6'da) ana sayfa NewBusinesses bölümü
// aynı mantığı buradan kullanır; sıralama gerçek tarih değeriyle yapılır.
export function getNewestSellers(
  list: Seller[],
  count: number = NEWEST_SELLER_COUNT
): Seller[] {
  return [...list]
    .sort((a, b) => Date.parse(b.joinedAt) - Date.parse(a.joinedAt))
    .slice(0, count);
}
