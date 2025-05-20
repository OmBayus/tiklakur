'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';

export interface OrderItem {
  id: string;
  title: string;
  date: string;
  totalPrice: string;
  paymentMethod: string;
}

export interface OrderTableProps {
  orders: OrderItem[];
  className?: string;
  height?: string | number;
}

export default function OrderTable({
  orders,
  className = '',
  height,
}: OrderTableProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const heightStyle = height
    ? typeof height === 'number'
      ? `${height}px`
      : height
    : 'auto';

  if (isMobile) {
    return (
      <div
        className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
        style={{ height: heightStyle }}
      >
        <div className="bg-gray-200 text-black p-4 font-semibold ">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 text-sm sm:text-base">
            <div className="col-span-5">Alışverişlerim</div>
          </div>
        </div>
        <div
          className="space-y-4 p-4 overflow-auto"
          style={{ maxHeight: height ? 'calc(100% - 56px)' : 'none' }}
        >
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <ShoppingCart className="h-5 w-5 text-gray-700 mt-1" />
                <div className="flex-1">
                  <h3 className="font-medium text-black text-sm sm:text-base">
                    {order.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs sm:text-sm">
                    <div className="font-medium text-black">Tarih:</div>
                    <div className="font-light text-gray-500">{order.date}</div>
                    <div className="font-medium text-black">Toplam fiyat:</div>
                    <div className="font-light text-gray-500">
                      ₺{order.totalPrice}
                    </div>
                    <div className="font-medium text-black">Ödeme türü:</div>
                    <div className="font-light text-gray-500">
                      ₺{order.totalPrice} {order.paymentMethod}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button variant="outline" className="w-full sm:w-32">
                  Fatura
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ height: heightStyle }}
    >
      <div
        className="w-full overflow-auto"
        style={{ maxHeight: height ? 'calc(100% - 0px)' : 'none' }}
      >
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-black rounded-3xl">
              <th className="py-4 px-4 text-left font-semibold rounded-tl-3xl w-10"></th>
              <th className="py-4 px-4 text-left font-semibold">
                Alışverişlerim
              </th>
              <th className="py-4 px-4 text-left font-semibold">Tarih</th>
              <th className="py-4 px-4 text-left font-semibold">
                Toplam fiyat
              </th>
              <th className="py-4 px-4 text-left font-semibold">Ödeme türü</th>
              <th className="py-4 px-4 text-center font-semibold rounded-tr-3xl">
                Faturalarım
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={`${order.id}-${index}`}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 align-top">
                  <ShoppingCart className="h-5 w-5 text-gray-700" />
                </td>
                <td className="py-4 px-4 align-top font-medium text-black whitespace-pre-line">
                  {order.title}
                </td>
                <td className="py-4 px-4 align-top font-light text-gray-500">
                  {order.date}
                </td>
                <td className="py-4 px-4 align-top font-light text-gray-500">
                  ₺{order.totalPrice}
                </td>
                <td className="py-4 px-4 align-top font-light text-gray-500">
                  ₺{order.totalPrice} {order.paymentMethod}
                </td>
                <td className="py-4 px-4 align-top text-right">
                  <Button variant="outline" className="w-full sm:w-32">
                    Fatura
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
