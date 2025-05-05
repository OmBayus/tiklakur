'use client';
import React from 'react';
import Image from 'next/image';

function User() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
      {/* Sol içerik */}
      <div className="md:col-span-4">
        <div className="relative mt-3 text-left">
          <p className="w-full font-bold text-4xl md:text-7xl">
            <span>Our Superior</span>
            <br />
            <span className="flex flex-col md:flex-row items-start md:mt-0 mt-4">
              Team
              <button className="ml-0 md:ml-4 mt-3 md:mt-5 px-6 py-2 text-sm border border-black rounded-full">
                Adım 1
              </button>
            </span>
          </p>
        </div>
      </div>

      {/* Sağ içerik */}
      <div className="md:col-span-8 relative">
        {/* Arka plan SVG (sadece 2xl ve üzeri) */}
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

        {/* Yazı içeriği */}
        <div className="relative z-10  md:p-8 text-left md:text-right w-full md:w-[80%] ml-0 md:ml-auto  ">
          <h2 className="text-xl md:text-2xl font-bold mb-4 ">
            Lorem Ipsum is simply dummy text of the
          </h2>
          <p className="text-sm md:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
