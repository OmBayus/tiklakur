'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  CheckCircle,
  ShoppingBag,
  FileCode,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

// Ürün tipi tanımı
export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  packageType?: string;
  price: number;
}

// Fiyat detayları tipi tanımı
export interface PriceDetails {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountCode?: string;
  discountAmount?: number;
  total: number;
}

// OrderFormData interface
export interface OrderFormData {
  invoiceType: string;
  taxId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  zipCode: string;
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  paymentMethod: string;
  product: Product;
  priceDetails: PriceDetails;
}

// Component prop'ları
export interface PaymentComponentProps {
  product: Product;
  priceDetails: PriceDetails;
  onCompleteOrder?: (
    formData: OrderFormData,
  ) => Promise<{ success: boolean; redirectUrl?: string; error?: string }>;
  showTitle?: boolean;
  className?: string;
}

export default function PaymentComponent({
  product,
  priceDetails,
  onCompleteOrder,
  showTitle = true,
  className = '',
}: PaymentComponentProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    invoiceType: 'individual',
    taxId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'istanbul',
    district: '',
    zipCode: '',
    cardHolder: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Form hata mesajını temizle
    if (formError) setFormError(null);
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Form hata mesajını temizle
    if (formError) setFormError(null);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
    // Form hata mesajını temizle
    if (formError) setFormError(null);
  };

  const validateForm = () => {
    // Basit form doğrulama
    if (!formData.firstName) return 'Ad alanı zorunludur.';
    if (!formData.lastName) return 'Soyad alanı zorunludur.';
    if (!formData.email) return 'E-posta alanı zorunludur.';
    if (!formData.phone) return 'Telefon alanı zorunludur.';
    if (!formData.address) return 'Adres alanı zorunludur.';

    if (paymentMethod === 'credit-card') {
      if (!formData.cardHolder) return 'Kart sahibi alanı zorunludur.';
      if (!formData.cardNumber) return 'Kart numarası alanı zorunludur.';
      if (!formData.expiryMonth) return 'Son kullanma ayı seçilmelidir.';
      if (!formData.expiryYear) return 'Son kullanma yılı seçilmelidir.';
      if (!formData.cvv) return 'CVV/CVC alanı zorunludur.';
    }

    if (!formData.termsAccepted)
      return 'Mesafeli satış sözleşmesini kabul etmelisiniz.';
    if (!formData.privacyAccepted)
      return 'Kişisel verilerin korunması politikasını kabul etmelisiniz.';

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form doğrulama
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      if (onCompleteOrder) {
        // Ödeme işlemcisine yönlendirme
        const result = await onCompleteOrder({
          ...formData,
          paymentMethod,
          product,
          priceDetails,
        });

        if (result.success) {
          // Başarılı ödeme durumunda
          if (result.redirectUrl) {
            // Eğer bir yönlendirme URL'i döndüyse (örn. iyzico)
            window.location.href = result.redirectUrl;
          } else {
            // Doğrudan başarılı sayfasına yönlendir
            router.push('/payment/success');
          }
        } else {
          // Başarısız ödeme durumunda
          if (result.error) {
            setFormError(result.error);
          } else {
            // Hata mesajı yoksa başarısız sayfasına yönlendir
            router.push('/payment/failure');
          }
        }
      }
    } catch {
      setFormError(
        'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full mx-auto py-4 sm:py-6 px-4  ${className}`}>
      {showTitle && (
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          Sipariş ve Ödeme
        </h1>
      )}

      {formError && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">{formError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Sol Taraf - Form Alanları */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Template Bilgileri */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Template Bilgileri
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-row gap-4">
                  <div
                    className="rounded-md overflow-hidden border flex-shrink-0"
                    style={{ width: '40%', height: '30%' }}
                  >
                    <Image
                      src={product.imageUrl || '/placeholder.svg'}
                      alt={product.title}
                      width={180}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fatura Bilgileri */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Fatura Bilgileri
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="invoiceType"
                      className="text-sm sm:text-base"
                    >
                      Fatura Tipi
                    </Label>
                    <RadioGroup
                      defaultValue="individual"
                      value={formData.invoiceType}
                      onValueChange={(value) =>
                        handleSelectChange('invoiceType', value)
                      }
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label
                          htmlFor="individual"
                          className="text-sm sm:text-base"
                        >
                          Bireysel
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corporate" id="corporate" />
                        <Label
                          htmlFor="corporate"
                          className="text-sm sm:text-base"
                        >
                          Kurumsal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="taxId" className="text-sm sm:text-base">
                      TC Kimlik No / Vergi No
                    </Label>
                    <Input
                      id="taxId"
                      placeholder="XXXXXXXXXXX"
                      className="h-9 sm:h-10"
                      value={formData.taxId}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="firstName" className="text-sm sm:text-base">
                      Ad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Adınız"
                      className="h-9 sm:h-10"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="lastName" className="text-sm sm:text-base">
                      Soyad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Soyadınız"
                      className="h-9 sm:h-10"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      E-posta <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      className="h-9 sm:h-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base">
                      Telefon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="05XX XXX XX XX"
                      className="h-9 sm:h-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="address" className="text-sm sm:text-base">
                    Adres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Adres satırı"
                    className="h-9 sm:h-10"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2 col-span-2 md:col-span-1">
                    <Label htmlFor="city" className="text-sm sm:text-base">
                      İl
                    </Label>
                    <Select
                      defaultValue="istanbul"
                      value={formData.city}
                      onValueChange={(value) =>
                        handleSelectChange('city', value)
                      }
                    >
                      <SelectTrigger id="city" className="h-9 sm:h-10">
                        <SelectValue placeholder="İl seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">İstanbul</SelectItem>
                        <SelectItem value="ankara">Ankara</SelectItem>
                        <SelectItem value="izmir">İzmir</SelectItem>
                        <SelectItem value="bursa">Bursa</SelectItem>
                        <SelectItem value="antalya">Antalya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 sm:space-y-2 col-span-2 md:col-span-1">
                    <Label htmlFor="district" className="text-sm sm:text-base">
                      İlçe
                    </Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) =>
                        handleSelectChange('district', value)
                      }
                    >
                      <SelectTrigger id="district" className="h-9 sm:h-10">
                        <SelectValue placeholder="İlçe seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kadikoy">Kadıköy</SelectItem>
                        <SelectItem value="besiktas">Beşiktaş</SelectItem>
                        <SelectItem value="sisli">Şişli</SelectItem>
                        <SelectItem value="uskudar">Üsküdar</SelectItem>
                        <SelectItem value="maltepe">Maltepe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 sm:space-y-2 col-span-2 md:col-span-1">
                    <Label htmlFor="zipCode" className="text-sm sm:text-base">
                      Posta Kodu
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="34XXX"
                      className="h-9 sm:h-10"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ödeme Bilgileri */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Ödeme Bilgileri
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                <RadioGroup
                  defaultValue="credit-card"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label
                      htmlFor="credit-card"
                      className="flex-1 text-sm sm:text-base"
                    >
                      Kredi Kartı / Banka Kartı
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label
                      htmlFor="transfer"
                      className="flex-1 text-sm sm:text-base"
                    >
                      Iyzico
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit-card' && (
                  <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-3">
                    <div className="space-y-1 sm:space-y-2">
                      <Label
                        htmlFor="cardHolder"
                        className="text-sm sm:text-base"
                      >
                        Kart Üzerindeki İsim{' '}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cardHolder"
                        placeholder="Kart sahibinin adı soyadı"
                        className="h-9 sm:h-10"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit-card'}
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <Label
                        htmlFor="cardNumber"
                        className="text-sm sm:text-base"
                      >
                        Kart Numarası <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="h-9 sm:h-10"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit-card'}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label
                          htmlFor="expiryDate"
                          className="text-sm sm:text-base"
                        >
                          Son Kullanma Tarihi{' '}
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Select
                            value={formData.expiryMonth}
                            onValueChange={(value) =>
                              handleSelectChange('expiryMonth', value)
                            }
                          >
                            <SelectTrigger
                              id="expiryMonth"
                              className="h-9 sm:h-10"
                            >
                              <SelectValue placeholder="Ay" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (month) => (
                                  <SelectItem
                                    key={month}
                                    value={month.toString().padStart(2, '0')}
                                  >
                                    {month.toString().padStart(2, '0')}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <Select
                            value={formData.expiryYear}
                            onValueChange={(value) =>
                              handleSelectChange('expiryYear', value)
                            }
                          >
                            <SelectTrigger
                              id="expiryYear"
                              className="h-9 sm:h-10"
                            >
                              <SelectValue placeholder="Yıl" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: 10 },
                                (_, i) => new Date().getFullYear() + i,
                              ).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="cvv" className="text-sm sm:text-base">
                          CVV/CVC <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="XXX"
                          maxLength={3}
                          className="h-9 sm:h-10"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit-card'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-3">
                    <div className="bg-muted p-3 sm:p-4 rounded-md">
                      <h3 className="font-medium mb-2 text-sm sm:text-base">
                        Iyzico ya yönlendiriliyorsunuz
                      </h3>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:col-span-4">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-4">
              <Card>
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-base sm:text-lg md:text-xl">
                    Sipariş Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          {product.title}
                        </p>
                        {product.packageType && (
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {product.packageType}
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-sm sm:text-base">
                        {product.price.toLocaleString('tr-TR')} TL
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Ara Toplam</span>
                      <span>
                        {priceDetails.subtotal.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    {/* KDV */}
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>KDV (%{priceDetails.taxRate * 100})</span>
                      <span>
                        {priceDetails.taxAmount.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    {/* İndirim varsa */}
                    {priceDetails.discountAmount &&
                      priceDetails.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600 text-sm sm:text-base">
                          <span>
                            İndirim{' '}
                            {priceDetails.discountCode
                              ? `(Kupon: ${priceDetails.discountCode})`
                              : ''}
                          </span>
                          <span>
                            -
                            {priceDetails.discountAmount.toLocaleString(
                              'tr-TR',
                            )}{' '}
                            TL
                          </span>
                        </div>
                      )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-base sm:text-lg">
                      <span>Toplam</span>
                      <span>
                        {priceDetails.total.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 sm:pt-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="termsAccepted"
                        className="mt-0.5 cursor-pointer"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            'termsAccepted',
                            checked as boolean,
                          )
                        }
                        required
                      />
                      <Label
                        htmlFor="termsAccepted"
                        className="text-xs sm:text-sm "
                      >
                        <span>
                          Mesafeli satış sözleşmesini okudum ve kabul ediyorum{' '}
                          <span className="text-red-500">*</span>
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacyAccepted "
                        className="mt-0.5 cursor-pointer"
                        checked={formData.privacyAccepted}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            'privacyAccepted',
                            checked as boolean,
                          )
                        }
                        required
                      />
                      <Label
                        htmlFor="privacyAccepted"
                        className="text-xs sm:text-sm "
                      >
                        <span>
                          Kişisel verilerin korunması politikasını okudum ve
                          kabul ediyorum{' '}
                          <span className="text-red-500 ">*</span>
                        </span>
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-6 pt-0 sm:pt-0 ">
                  <Button
                    type="submit"
                    className="w-full h-9 sm:h-10 text-sm sm:text-base cursor-pointer"
                    disabled={
                      isSubmitting ||
                      !formData.termsAccepted ||
                      !formData.privacyAccepted
                    }
                  >
                    {isSubmitting ? 'İşleniyor...' : 'Siparişi Tamamla'}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-6 pt-4 sm:pt-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <p className="text-xs sm:text-sm">
                        Güvenli ödeme altyapısı ile işlemleriniz koruma
                        altındadır.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <p className="text-xs sm:text-sm">
                        Ödeme sonrası template dosyaları anında e-posta ile
                        gönderilir.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
