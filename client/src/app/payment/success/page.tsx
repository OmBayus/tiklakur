'use client';

import Link from 'next/link';
import { CheckCircle, Download, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SuccessPage() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <Card className="border border-green-200 shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-green-700">
              Ödeme Başarılı
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center text-sm text-gray-600 space-y-4">
            <p>
              Siparişiniz alındı. Template dosyaları e-posta adresinize
              gönderildi.
            </p>

            <div className="bg-gray-50 rounded-md p-3 space-y-1 text-left text-sm">
              <div className="flex justify-between">
                <span>Sipariş No:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Tarih:</span>
                <span>{new Date().toLocaleDateString('tr-TR')}</span>
              </div>
            </div>

            <ul className="text-left space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>E-posta adresinizi kontrol edin.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Sorularınız için destek ekibimizle iletişime geçin.</span>
              </li>
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Dosyaları İndir
            </Button>
            <Link href="/" className="w-full">
              <Button variant="secondary" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfa
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
