'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Sparkles,
  Settings,
} from 'lucide-react';

const menuItems = [
  { name: 'TıklaKur', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Siparişlerim', path: '/dashboard/order', icon: ShoppingBag },
  { name: 'Templatelerim', path: '/dashboard/template', icon: FileText },
  { name: 'Özel İstek', path: '/dashboard/specialRequest', icon: Sparkles },
  { name: 'Ayarlar', path: '/dashboard/settings', icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden xl:block bg-white h-screen w-64 pr-6 pb-4 ">
      <nav className="flex flex-col gap-2 a">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'group flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ease-in-out',
                isActive
                  ? 'bg-purple-100 text-purple-700 font-semibold'
                  : 'hover:bg-gray-100 text-gray-700',
              )}
            >
              <Icon
                size={20}
                className={clsx(
                  'transition-colors duration-200',
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-700 group-hover:text-black',
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
