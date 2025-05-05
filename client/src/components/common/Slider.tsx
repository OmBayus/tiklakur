'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const slides = [
  {
    image: '/png/signum_dashboard.png',
    title: 'Dashboard 1',
    description: 'This is the description for the first slide.',
  },
  {
    image: '/png/signum_dashboard.png',
    title: 'Dashboard 2',
    description: 'Second slide with a new dashboard layout.',
  },
  {
    image: '/png/signum_dashboard.png',
    title: 'Dashboard 3',
    description: 'Final slide showing advanced analytics features.',
  },
];

function Slider() {
  const [current, setCurrent] = useState<number>(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const getPosition = (index: number): string => {
    const total = slides.length;
    const leftIndex = (current + total - 1) % total;
    const rightIndex = (current + 1) % total;

    if (index === current) return 'center';
    if (index === leftIndex) return 'left';
    if (index === rightIndex) return 'right';
    return 'hidden';
  };

  return (
    <div className="relative w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden">
      {/* Dekorlar */}
      <Image
        src="/svg/left1.svg"
        alt="left-decor"
        width={150}
        height={140}
        className="hidden 2xl:block absolute left-0 top-2/5 -translate-y-1/2 z-0 pointer-events-none"
      />
      <Image
        src="/svg/right1.svg"
        alt="right-decor"
        width={150}
        height={140}
        className="hidden 2xl:block absolute right-0 top-3/5 -translate-y-1/2 z-0 pointer-events-none"
      />

      {/* Slider */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px] flex items-center justify-center">
          {/* Sol Ok */}
          <button
            onClick={prevSlide}
            className="cursor-pointer absolute left-2 sm:left-4 z-30 bg-gray-400/70 hover:bg-gray-500/80 text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition duration-200 active:scale-90"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Görseller */}
          <div className="relative w-full h-full overflow-visible">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${getPosition(
                  index,
                )}`}
              >
                <div className="w-[240px] sm:w-[320px] md:w-[480px] lg:w-[600px] mx-auto">
                  <Image
                    src={slide.image}
                    alt={`Slide ${index}`}
                    width={600}
                    height={400}
                    layout="responsive"
                    className="rounded-xl shadow-xl cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Sağ Ok */}
          <button
            onClick={nextSlide}
            className="cursor-pointer absolute right-2 sm:right-4 z-30 bg-gray-400/70 hover:bg-gray-500/80 text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition duration-200 active:scale-90"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Açıklama */}
        <div
          key={current}
          className="cursor-pointer mt-6 text-center transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn px-4"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {slides[current].title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            {slides[current].description}
          </p>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .left {
          left: 50%;
          transform: translateX(-100%) scale(0.92);
          opacity: 0.4;
          z-index: 5;
        }
        .center {
          left: 50%;
          transform: translateX(-50%) scale(1.1);
          opacity: 1;
          z-index: 10;
        }
        .right {
          left: 50%;
          transform: translateX(0%) scale(0.92);
          opacity: 0.4;
          z-index: 5;
        }
        .hidden {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .left {
            transform: translateX(-90%) scale(0.9);
          }
          .center {
            transform: translateX(-50%) scale(1.05);
          }
          .right {
            transform: translateX(2%) scale(0.9);
          }
        }

        .left,
        .center,
        .right {
          transition: all 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Slider;
