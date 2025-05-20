'use client';

import Payment from '@/components/common/Payment';
import type { OrderFormData } from '@/components/common/Payment';
import NavbarRegister from '@/components/common/NavbarRegister';
import Footer from '@/components/common/Footer';

export default function OrnekKullanimPage() {
  // Farklı bir ürün örneği
  const product = {
    id: 'template-2',
    title: 'Blog Template',
    description:
      'Modern ve minimalist tasarımlı blog teması. SEO dostu yapısı, hızlı yükleme süresi ve kolay özelleştirilebilir bileşenleriyle içeriklerinizi en iyi şekilde sunun.',
    imageUrl: '/placeholder.svg?height=1080&width=1920',
    packageType: 'Standart Paket',
    price: 799.99,
  };

  // Farklı fiyat detayları
  const priceDetails = {
    subtotal: 799.99,
    taxRate: 0.18, // %18
    taxAmount: 144.0,
    discountCode: 'BLOG20',
    discountAmount: 160.0,
    total: 783.99,
  };

  // Sipariş tamamlama işlevi
  const handleCompleteOrder = async (
    formData: OrderFormData,
  ): Promise<{ success: boolean; redirectUrl?: string; error?: string }> => {
    console.log('Blog teması siparişi:', formData);
    // Burada sipariş işleme, ödeme alma, vb. işlemler yapılabilir

    return { success: true };
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="xl:px-[144px]  md:px-[28px] sm:px-[8px]">
        <div>
          <NavbarRegister />
        </div>

        <Payment
          product={product}
          priceDetails={priceDetails}
          onCompleteOrder={handleCompleteOrder}
          showTitle={false}
          className="mt-10"
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
