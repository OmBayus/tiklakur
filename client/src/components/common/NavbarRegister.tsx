'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CiUser } from 'react-icons/ci';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Sparkles,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { HiCursorClick } from 'react-icons/hi';

const menuItems = [
  { name: 'TıklaKur', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Siparişlerim', path: '/dashboard/order', icon: ShoppingBag },
  { name: 'Templatelerim', path: '/dashboard/template', icon: FileText },
  { name: 'Özel İstek', path: '/dashboard/specialRequest', icon: Sparkles },
  { name: 'Ayarlar', path: '/dashboard/settings', icon: Settings },
];

const Header = () => {
  const [activeMainCategory, setActiveMainCategory] = useState('');
  const [language, setLanguage] = useState<'TR' | 'EN'>('TR');
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  const mainCategories = Array.from(
    { length: 8 },
    (_, i) => `Kategori ${i + 1}`,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Üst bar */}
      <nav className="w-full flex flex-wrap items-center justify-between gap-4 px-4 pt-6 md:pt-4 pb-2 mt-2">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 cursor-pointer">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <HiCursorClick
              className="w-6 h-6 text-purple-500"
              style={{ fill: 'url(#gradient)' }}
            />
            <svg width="0" height="0">
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#8b5cf6" offset="0%" />
                <stop stopColor="#ec4899" offset="100%" />
              </linearGradient>
            </svg>
          </div>

          <span className=" text-lg font-bold  ">TıklaKur</span>
        </a>

        {/* Masaüstü Search (sadece lg ve üstü) */}
        <div className="hidden lg:flex flex-1 justify-left ml-[7%]">
          <div className="flex items-center w-full max-w-[550px] rounded-full border border-black bg-white px-3 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Ara..."
              className="flex-1 text-sm focus:outline-none bg-transparent"
            />
            <button>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Masaüstü: Profil */}
        <div className="hidden lg:flex items-center gap-5" ref={profileRef}>
          <div className="relative flex w-20 h-9 rounded-full shadow-inner border bg-gray-50 border-gray-200 cursor-pointer">
            <motion.div
              className="absolute top-[2px] left-[2px] h-7 w-8 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold"
              animate={{ x: language === 'TR' ? 0 : 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {language}
            </motion.div>
            <div
              className="flex w-full h-full justify-between items-center px-3 text-xs font-semibold text-gray-600"
              onClick={() => setLanguage(language === 'TR' ? 'EN' : 'TR')}
            >
              <span>TR</span>
              <span>EN</span>
            </div>
          </div>

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="p-2 rounded-full bg-gray-100"
          >
            <CiUser className="w-8 h-8 text-black" />
          </button>

          {profileOpen && (
            <div className="absolute right-4 top-20 w-56 bg-white shadow-lg rounded-md z-50 py-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100',
                      isActive
                        ? 'text-purple-700 font-semibold'
                        : 'text-gray-700',
                    )}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-purple-600' : 'text-gray-500'}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobil: Kategoriler ve Menü */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
            className="text-sm h-10 px-4 rounded-full bg-gray-100   flex items-center font-medium text-black cursor-pointer hover:bg-gray-50 active:scale-95 transition"
          >
            Kategoriler
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-3xl bg-gray-100 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobil: Açılır kategori listesi */}
      {mobileCategoryOpen && (
        <div className="lg:hidden px-4 pb-2">
          <div className="bg-white border rounded-md shadow p-4 space-y-2">
            {mainCategories.map((cat) => (
              <a
                key={cat}
                href="#"
                className={clsx(
                  'block text-sm font-medium',
                  activeMainCategory === cat
                    ? 'text-black font-bold'
                    : 'text-gray-600 hover:text-black',
                )}
                onClick={() => setActiveMainCategory(cat)}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Masaüstü: kategori listesi */}
      <div className="hidden lg:flex flex-wrap justify-center items-center border-t border-b px-4 py-4 mt-2">
        {mainCategories.map((cat) => (
          <a
            key={cat}
            href="#"
            className={clsx(
              'text-sm font-medium border-b-2 cursor-pointer mx-[2%]',
              activeMainCategory === cat
                ? 'text-black font-bold border-black'
                : 'text-gray-600 border-transparent hover:text-black hover:border-black',
            )}
            onClick={() => setActiveMainCategory(cat)}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Mobil Menü Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-lg p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Menü</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Mobil Search (sadece drawer içinde) */}
            <div>
              <div className="flex items-center w-full rounded-full border border-black bg-white px-3 py-2 shadow-sm">
                <input
                  type="text"
                  placeholder="Ara..."
                  className="flex-1 text-sm focus:outline-none bg-transparent"
                />
                <button>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menü Linkleri */}
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center gap-2 px-2 py-2 rounded-md',
                      isActive
                        ? 'bg-gray-100 text-purple-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100',
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
