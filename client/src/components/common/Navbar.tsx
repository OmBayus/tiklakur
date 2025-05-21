'use client';

import React, { useState } from 'react';
import { HiCursorClick } from 'react-icons/hi';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative w-full pt-6 md:pt-4 pb-2 flex items-center justify-between px-4">
      <div className="flex justify-between items-center w-full">
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
          <span className="text-lg font-bold">TıklaKur</span>
        </a>

        {/* Hamburger Menu (xl altı görünür) */}
        <button
          className="xl:hidden flex items-center text-black"
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menü (xl ve üstü) */}
        <div className="hidden xl:flex flex-1 items-center justify-end ml-30">
          {/* Giriş Yap */}
          <div className="hidden xl:flex items-center ml-6">
            <a
              href="/auth"
              className="w-[170px] py-2 text-sm border-2 border-black rounded-full text-center whitespace-nowrap font-medium transition-colors duration-200 hover:bg-black hover:text-white"
            >
              Giriş Yap
            </a>
          </div>
        </div>
      </div>

      {/* Sağdan açılır hamburger menü */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileMenuOpen(false)}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 space-y-4">
          {/* Giriş Yap */}
          <a
            href="#"
            className="w-full block px-8 py-2 text-sm border border-black rounded-full text-center font-medium transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Giriş Yap
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
