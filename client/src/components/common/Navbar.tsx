'use client';

import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All items');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories = ['All items', 'Templates', 'UI Kits', 'Plugins', 'Themes'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative w-full pt-6 md:pt-4 pb-2 flex items-center justify-between px-4 sm:px-8 lg:px-[144px]">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 cursor-pointer">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <span className="font-semibold text-lg">envato</span>
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
        <div className="hidden xl:flex flex-1 items-center justify-between ml-30">
          {/* Search */}
          <div className="flex w-full max-w-xl items-center gap-2">
            <div className="relative flex rounded-full border-2 border-black w-full">
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-[120px] text-sm text-gray-600 px-4 py-2 border-r border-black cursor-pointer flex items-center justify-between"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="font-bold">{selectedCategory}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[160px] bg-white rounded-lg shadow-lg border-2 border-black z-50">
                    <ul className="py-1">
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsOpen(false);
                          }}
                        >
                          <span
                            className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                              selectedCategory === category
                                ? 'text-black font-bold bg-gray-50'
                                : 'text-gray-700'
                            }`}
                          >
                            {category}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-4 py-2 text-sm focus:outline-none"
              />
              <button className="px-4">
                <svg
                  className="w-4 h-4 text-gray-400"
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
          {/* Dropdown */}
          <div className="relative w-full" ref={dropdownRef}>
            <div
              className="w-full text-sm text-gray-700 px-4 py-2 border border-black rounded-full cursor-pointer flex items-center justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="font-semibold">{selectedCategory}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-black z-50">
                <ul className="py-1">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpen(false);
                      }}
                    >
                      <span
                        className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          selectedCategory === category
                            ? 'text-black font-bold bg-gray-50'
                            : 'text-gray-700'
                        }`}
                      >
                        {category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Arama */}
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-sm border border-black rounded-full focus:outline-none"
          />

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
