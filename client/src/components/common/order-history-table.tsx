import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  title: string;
  date: string;
  totalPrice: string;
  paymentMethod: string;
}

interface OrderHistoryTableProps {
  orders: OrderItem[];
}

export default function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
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
                <span className="font-medium text-purple-700">
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
