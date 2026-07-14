import { sellers } from "./mockData";
import type { Seller } from "./mockData";

// Bir seçkinin sellerIds değerlerini gerçekten var olan Seller kayıtlarına
// çözer. sellerIds sırası korunur; karşılığı bulunamayan id sessizce atlanır
// (sayfa çökmez, konsola hata yazılmaz). Gösterilecek işletme sayısı da bu
// çözülen liste üzerinden hesaplanmalıdır.
export function resolveCollectionSellers(sellerIds: string[]): Seller[] {
  return sellerIds
    .map((id) => sellers.find((seller) => seller.id === id))
    .filter((seller): seller is Seller => seller !== undefined);
}
