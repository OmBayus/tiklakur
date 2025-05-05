import React from 'react';
import Image from 'next/image';

function Info() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-white">
      <div className="md:col-span-8">
        <div className="relative rounded-3xl h-70 overflow-hidden">
          <Image
            src="/svg/Left2.svg"
            alt="card"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-4 md:p-8 bg-black/40">
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
                <li>Teknik Destek</li>
                <li>Özel Tasarım Templat</li>
              </ul>
              <ul className="list-disc ml-5 space-y-1">
                <li>Teknik Destek</li>
                <li>Özel Tasarım Templat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobilde gizleme yerine boşluk bırakılmadan alta geçmesi sağlandı */}
      <div className="md:col-span-1 hidden md:block" />

      <div className="md:col-span-3">
        <div className="relative rounded-3xl h-70 overflow-hidden">
          <Image
            src="/svg/Left2.svg"
            alt="card"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-4 md:p-8 bg-black/40">
            <h2 className="text-xl md:text-4xl font-bold mb-2">From OMBAYUS</h2>

            <div className="text-sm md:text-base">
              <ul className="list-disc ml-5 space-y-1">
                <li>Teknik Destek</li>
                <li>Özel Tasarım Templat</li>
                <li>Özel Tasarım Templat</li>
              </ul>
            </div>
            <button className="cursor-pointer border-2 rounded-full w-full py-2 mt-4 font-bold text-sm md:text-base">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
