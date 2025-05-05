'use client';
import React, { useState } from 'react';
import Image from 'next/image';

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
    <div className="relative w-full bg-gray-100 py-16 px-4 flex flex-col items-center overflow-hidden">
      {/* Sol Dekor */}
      <Image
        src="/svg/left1.svg"
        alt="left-decor"
        width={120}
        height={140}
        className="absolute left-0 top-2/5 -translate-y-1/2 z-0 pointer-events-none"
      />

      {/* Sağ Dekor */}
      <Image
        src="/svg/right1.svg"
        alt="right-decor"
        width={120}
        height={140}
        className="absolute right-0 top-3/5 -translate-y-1/2 z-0 pointer-events-none"
      />

      {/* Slider */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[340px] lg:h-[420px] flex items-center justify-center">
          {/* Sol ok */}
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-6 z-30 bg-gray-400/70 hover:bg-gray-500/80 text-white rounded-full min-w-10 min-h-10 sm:w-14 sm:h-14 flex items-center justify-center transition duration-200 active:scale-90"
          >
            &lt;
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

          {/* Sağ ok */}
          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-6 z-30 bg-gray-400/70 hover:bg-gray-500/80 text-white rounded-full min-w-10 min-h-10 sm:w-14 sm:h-14 flex items-center justify-center transition duration-200 active:scale-90"
          >
            &gt;
          </button>
        </div>

        {/* Açıklama */}
        <div
          key={current}
          className="cursor-pointer mt-6 text-center transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn px-2"
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
          transform: translateX(10%) scale(0.92);
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
            transform: translateX(5%) scale(0.9);
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
