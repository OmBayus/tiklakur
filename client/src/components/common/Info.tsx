'use client';
import React from 'react';

function Info() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Sol Alan */}
      <div className="md:col-span-8 custom-md xl:col-span-8 ">
        <div className="relative rounded-3xl h-70 overflow-hidden">
          <div className="border-black text-black rounded-3xl absolute inset-0 z-10 flex flex-col justify-center items-start p-4 md:p-8 border-3   ">
            <h2 className="text-2xl md:text-4xl font-black mb-2">
              Bizimle Çalışmaya var mısın?
            </h2>
            <p className="text-lg md:text-2xl mb-4 font-bold">
              Neler Katıyoruz:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 text-sm md:text-base">
              <ul className="list-disc ml-5 space-y-1">
                <li>Teknik Destek</li>
                <li>Özel Tasarım Templat</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Mobil Uyum</li>
                <li>SEO Desteği</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Performans Optimizasyonu</li>
                <li>7/24 Destek</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Alan */}
      <div className="md:col-span-4 custom-mdxl:col-span-4">
        <div className="relative rounded-3xl h-70 overflow-hidden">
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-4 md:p-8 border-black rounded-3xl border-3">
            <h2 className="text-xl md:text-3xl font-bold mb-2">From OMBAYUS</h2>

            <ul className="list-disc ml-5 space-y-1 text-sm md:text-base">
              <li>Teknik Destek</li>
              <li>Özel Tasarım Templat</li>
              <li>Modern UI Kit</li>
            </ul>

            <button className="cursor-pointer border-2 rounded-full w-full py-2 mt-4 font-bold text-sm md:text-base border-black bg-black text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Özel stil tanımı */}
      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1279px) {
          .custom-mdxl\\:col-span-4 {
            grid-column: span 4 / span 4;
          }
          .custom-mdxl\\:col-span-8 {
            grid-column: span 8 / span 8;
          }
        }
      `}</style>
    </div>
  );
}

export default Info;
