export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Siparişlerim</h1>
      <p className="text-gray-700">
        Burada tüm siparişlerinizi görebilir, detaylarına ulaşabilirsiniz.
      </p>

      {/* Örnek kart */}
      <div className="border rounded p-4 shadow-sm bg-gray-50">
        <h2 className="font-semibold">WCFM Marketplace Eklentisine Hakim</h2>
        <p className="text-sm text-gray-600">
          11 Mayıs • Bütçe: 3000 TL • Süre: Birkaç gün içinde
        </p>
        <p className="mt-2 text-gray-700">
          Wordpress e-ticaret sistemimize özel bir WCFM Marketplace uyarlaması
          yapılacaktır.
        </p>
      </div>
    </div>
  );
}
