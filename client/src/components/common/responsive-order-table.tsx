'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';

interface OrderItem {
  id: string;
  title: string;
  date: string;
  totalPrice: string;
  paymentMethod: string;
}

interface ResponsiveOrderTableProps {
  orders: OrderItem[];
}

export default function ResponsiveOrderTable({
  orders,
}: ResponsiveOrderTableProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <ShoppingCart className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-medium text-purple-700">{order.title}</h3>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-sm text-gray-500">Tarih:</div>
                  <div className="text-sm">{order.date}</div>

                  <div className="text-sm text-gray-500">Toplam fiyat:</div>
                  <div className="text-sm">₺{order.totalPrice}</div>

                  <div className="text-sm text-gray-500">Ödeme türü:</div>
                  <div className="text-sm">
                    ₺{order.totalPrice} {order.paymentMethod}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1">
                Makbuz
              </Button>
              <Button variant="outline" className="flex-1">
                Fatura
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 px-4 text-left font-medium text-gray-500">
              {/* Empty header for icon column */}
            </th>
            <th className="py-4 px-4 text-left font-medium text-gray-500">
              {/* Empty header for title column */}
            </th>
            <th className="py-4 px-4 text-left font-medium text-gray-500">
              Tarih
            </th>
            <th className="py-4 px-4 text-left font-medium text-gray-500">
              Toplam fiyat
            </th>
            <th className="py-4 px-4 text-left font-medium text-gray-500">
              Ödeme türü
            </th>
            <th
              className="py-4 px-4 text-center font-medium text-gray-500"
              colSpan={2}
            >
              {/* Empty header for action buttons */}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="py-4 px-4 align-top">
                <ShoppingCart className="h-5 w-5 text-gray-500" />
              </td>
              <td className="py-4 px-4 align-top">
                <span className="font-medium text-purple-700 whitespace-pre-line">
                  {order.title}
                </span>
              </td>
              <td className="py-4 px-4 align-top text-gray-600">
                {order.date}
              </td>
              <td className="py-4 px-4 align-top text-gray-600">
                ₺{order.totalPrice}
              </td>
              <td className="py-4 px-4 align-top text-gray-600">
                ₺{order.totalPrice} {order.paymentMethod}
              </td>
              <td className="py-4 px-2 align-top">
                <Button variant="outline" className="w-full">
                  Makbuz
                </Button>
              </td>
              <td className="py-4 px-2 align-top">
                <Button variant="outline" className="w-full">
                  Fatura
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
