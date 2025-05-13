'use client';

import { useState } from 'react';
import LoginPage from '@/components/common/login-form';
import SignupPage from '@/components/common/signup-form';
import ForgotPasswordForm from '@/components/common/forgot-password';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const contentList = [
    {
      image: '/svg/firstThree1.svg',
      title: 'Temp 1',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      image: '/svg/firstThree2.svg',
      title: 'Temp 2',
      desc: 'Second content description goes here for Temp 2.',
    },
    {
      image: '/svg/firstThree3.svg',
      title: 'Temp 3',
      desc: 'Third content details displayed when Temp 3 selected.',
    },
  ];

  const thumbnails = ['/svg/blub1.svg', '/svg/blub2.svg', '/svg/blub3.svg'];

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="container mx-auto py-3 flex justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-primary transition-colors"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span className="font-semibold text-lg">envato</span>
          </Link>
        </div>
      </nav>
      {/* Navbar ile içerik arasında boşluk */}

      {/* Sol: Giriş / Kayıt Formu */}
      <div className="w-full md:w-7/12 p-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          {!showForgotPassword && (
            <div className="mb-8">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveForm('login')}
                  className={`py-2 px-4 w-1/2 text-center cursor-pointer ${
                    activeForm === 'login'
                      ? 'border-b-2 border-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => setActiveForm('signup')}
                  className={`py-2 px-4 w-1/2 text-center cursor-pointer ${
                    activeForm === 'signup'
                      ? 'border-b-2 border-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          )}

          {showForgotPassword ? (
            <div>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="mb-4 text-sm text-primary hover:underline flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Giriş sayfasına dön
              </button>
              <ForgotPasswordForm />
            </div>
          ) : (
            <>
              {activeForm === 'login' && (
                <LoginPage onForgotPassword={() => setShowForgotPassword(true)} />
              )}
              {activeForm === 'signup' && <SignupPage />}
            </>
          )}
        </div>
      </div>

      {/* Sağ: Slider İçerik - sadece md ve üzeri görünür */}

      <div className=" hidden right-[5%] md:flex w-full md:w-5/12 items-center justify-center p-6 relative">
        <div className="relative w-full rounded-3xl overflow-hidden max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                src={contentList[activeIndex].image}
                alt="Main"
                width={900}
                height={600}
                className="w-full h-auto rounded-3xl"
                priority
              />
              <motion.div
                key={contentList[activeIndex].title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute bottom-8 right-8 bg-white p-4 rounded-3xl text-left w-[90%] sm:w-[70%] md:w-[40%] max-w-xs z-20"
              >
                <button className="absolute top-3 cursor-pointer right-3 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                  <span className="text-black text-xs font-bold">↗</span>
                </button>
                <h1 className="text-base sm:text-lg font-extrabold">
                  {contentList[activeIndex].title}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-justify">
                  {contentList[activeIndex].desc}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail'lar - sadece md ve üstü cihazlarda görünür */}
          <div className="absolute top-[24%] hidden md:flex flex-col gap-2 z-30 w-[12%]">
            {thumbnails.map((src, index) => (
              <div
                key={index}
                className={`relative aspect-square mt-[14%] w-full cursor-pointer ${
                  activeIndex === index
                    ? 'border-2 border-black'
                    : 'border-2 border-transparent'
                } rounded-xl transition-all duration-300`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={src}
                  alt={`thumb-${index}`}
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
