import OrderTable from '@/components/common/order-table';
export default function OrdersPage() {
  const orders = [
    {
      id: '1',
      title: "Türkiye'nin En Güncel Spring Kursu : 2025\nGeri ödeme talep et",
      date: '17 Nis 2025',
      totalPrice: '399,99',
      paymentMethod: 'MasterCard ****2923',
    },
    {
      id: '2',
      title: 'Java Programlama Dili : Her Seviyeye Uygun Eğitim Seti',
      date: '10 Nis 2025',
      totalPrice: '299,99',
      paymentMethod: 'MasterCard ****2923',
    },
    {
      id: '3',
      title: 'Sıfırdan Her Yönüyle JavaScript & Node.JS',
      date: '25 Oca 2025',
      totalPrice: '129,99',
      paymentMethod: 'MasterCard ****2923',
    },
    {
      id: '4',
      title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
      date: '24 Oca 2025',
      totalPrice: '149,99',
      paymentMethod: 'Kredi Kartı',
    },
    {
      id: '5',
      title: 'Sıfırdan İleri Düzey Etik Hacker Kursu (Uygulamalı)',
      date: '14 May 2020',
      totalPrice: '24,99',
      paymentMethod: 'Visa ****3341',
    },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Siparişlerim</h1>
      <p className="text-gray-700">
        Burada tüm siparişlerinizi görebilir, detaylarına ulaşabilirsiniz.
      </p>
      <div className="mt-12">
        <OrderTable orders={orders} height={500} />
      </div>
    </div>
  );
}
