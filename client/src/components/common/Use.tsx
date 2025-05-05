'use client';
import React from 'react';
import Image from 'next/image';

interface UserProps {
  isReversed?: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  heading: string;
  paragraph: string;
}

function User({
  isReversed = false,
  title,
  subtitle,
  buttonText,
  heading,
  paragraph,
}: UserProps) {
  if (isReversed) {
    // VERSİYON 1 — Başlık solda, SVG sağda
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
        {/* Sol içerik */}
        <div className="md:col-span-4">
          <div className="relative mt-3 text-left">
            <p className="w-full font-bold text-4xl md:text-7xl">
              <span>{title}</span>
              <br />
              <span className="flex flex-col md:flex-row items-start md:mt-0 mt-4">
                {subtitle}
                <button className="ml-0 md:ml-4 mt-3 md:mt-5 px-6 py-2 text-sm border border-black rounded-full">
                  {buttonText}
                </button>
              </span>
            </p>
          </div>
        </div>

        {/* Sağ içerik */}
        <div className="md:col-span-8 relative">
          <div className="hidden 2xl:flex absolute inset-0 z-0 justify-end items-center pointer-events-none">
            <Image
              src="/svg/right.svg"
              alt="Background"
              width={0}
              height={0}
              style={{ width: 'auto', height: '100%' }}
              className="block"
              priority
            />
          </div>
          <div className="relative z-10 md:p-8 text-left md:text-right w-full md:w-[80%] ml-0 md:ml-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4">{heading}</h2>
            <p className="text-sm md:text-base">{paragraph}</p>
          </div>
        </div>
      </div>
    );
  }

  // VERSİYON 2 — Başlık sağda, SVG solda
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
      {/* Sol içerik (arka plan ve yazı) */}
      <div className="md:col-span-8 relative order-2 md:order-1">
        <div className="hidden 2xl:flex absolute inset-0 z-0 justify-start items-center pointer-events-none">
          <Image
            src="/svg/left.svg"
            alt="Background"
            width={0}
            height={0}
            style={{ width: 'auto', height: '100%' }}
            className="block"
            priority
          />
        </div>

        <div className="relative z-10 md:p-8 text-left w-full md:w-[90%]">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{heading}</h2>
          <p className="text-sm md:text-base md:w-[75%]">{paragraph}</p>
        </div>
      </div>

      {/* Sağ içerik */}
      <div className="md:col-span-4 order-1 md:order-2">
        <div className="relative mt-3 text-left md:text-right">
          <p className="w-full font-bold text-4xl md:text-7xl">
            <span>{title}</span>
            <br />
            <span className="flex flex-col-reverse md:flex-row items-start md:items-end md:justify-end mt-4 md:mt-0">
              <button className="mr-0 md:mr-4 mt-3 md:mt-5 px-6 py-2 text-sm border border-black rounded-full">
                {buttonText}
              </button>
              {subtitle}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
