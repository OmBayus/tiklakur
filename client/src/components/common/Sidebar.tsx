'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Sparkles,
  Settings,
  Menu,
  X,
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobil Menü Butonu */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-50">
        <h2 className="text-lg font-bold">Menü</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-white lg:static lg:translate-x-0 fixed top-0 left-0 h-full w-64 pt-4 pr-6 pb-4 z-40 transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default Sidebar;
