'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <Card className=" shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-red-700">
              Ödeme Başarısız
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center text-sm text-gray-600 space-y-4">
            <p>
              Bir sorun oluştu. Lütfen bilgilerinizi kontrol ederek tekrar
              deneyin.
            </p>

            <ul className="list-disc list-inside text-left space-y-1">
              <li>Kart bilgileri hatalı olabilir</li>
              <li>Yetersiz bakiye</li>
              <li>Banka onayı alınamadı</li>
              <li>Sistemsel bir hata olabilir</li>
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Link href="/payment" className="w-full">
              <Button className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tekrar Dene
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Ana Sayfa
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
