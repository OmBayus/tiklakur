'use client';
import React, { useState } from 'react';
import Image from 'next/image';

function First() {
  const [activeIndex, setActiveIndex] = useState(0);

  const contentList = [
    {
      image: '/svg/firstThree.svg',
      title: 'Temp 1',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      image: '/svg/firstThree.svg',
      title: 'Temp 2',
      desc: 'Second content description goes here for Temp 2.',
    },
    {
      image: '/svg/firstThree.svg',
      title: 'Temp 3',
      desc: 'Third content details displayed when Temp 3 selected.',
    },
  ];

  const thumbnails = ['/svg/blub1.svg', '/svg/blub2.svg', '/svg/blub3.svg'];

  return (
    <div className="w-full py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center px-4">
        {/* Sol içerik */}
        <div className="flex flex-col gap-8 md:col-span-5">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold">OMBAYUS</h1>
            <p className="text-xl md:text-2xl mt-2 font-medium">
              Lorem Ipsum is simply dummy text of the
            </p>
            <p className="text-sm md:text-base mt-4 text-justify text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:items-center">
            <button className="cursor-pointer border-3 border-black rounded-full px-6 py-3 bg-black text-white font-bold text-lg sm:w-60 text-center after:content-['_↗']">
              Try it
            </button>
            <button className="border-3 rounded-full px-6 py-3 border-black font-bold text-lg text-black text-center cursor-pointer">
              $56.99
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="cursor-pointer relative text-sm font-bold bg-gray-100 p-4 rounded-2xl">
              <div className="absolute right-4 top-6 bg-white rounded-full w-10 h-10 flex items-center justify-center ">
                <span className="text-black text-xl">↗</span>
              </div>
              <div className="text-left">
                <p className="mt-1 text-lg px-4">Lorem ipsum</p>
                <p className="font-normal px-4">Deneme</p>
              </div>
            </button>

            <div className="bg-gray-100 p-4 rounded-2xl text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-start">
                  <p className="font-bold text-2xl px-3">51+</p>
                  <p className="text-xs px-3">Download</p>
                </div>
                <div className="flex flex-col justify-center items-start border-l border-gray-300 pl-4">
                  <p className="font-bold text-2xl px-3">9.2</p>
                  <p className="text-xs px-3">Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orta boşluk */}
        <div className="hidden md:block md:col-span-1" />

        {/* Sağ içerik */}
        <div className="md:col-span-6">
          <div className="relative w-full rounded-3xl overflow-hidden transition-all duration-500">
            <Image
              src={contentList[activeIndex].image}
              alt="Main"
              width={900}
              height={600}
              className="w-full h-auto rounded-3xl cursor-pointer transition-all duration-500"
              priority
            />

            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-3xl text-left w-[40%] z-20">
              <button className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center">
                <span className="text-black text-sm font-bold">↗</span>
              </button>
              <h1 className="text-2xl font-extrabold">
                {contentList[activeIndex].title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-justify">
                {contentList[activeIndex].desc}
              </p>
            </div>

            {/* <div className="absolute  top-30  flex flex-col gap-2 z-30">
              {thumbnails.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`thumb-${index}`}
                  width={50}
                  height={50}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-xl cursor-pointer  w-22 h-22 border-2 ${
                    activeIndex === index
                      ? 'border-black'
                      : 'border-transparent'
                  } transition-all duration-300`}
                />
              ))}
            </div> */}

            <div className="absolute  top- flex flex-col gap-2 z-30">
              {thumbnails.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`thumb-${index}`}
                  width={50}
                  height={50}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-xl cursor-pointer w-24 border-2 ${
                    activeIndex === index
                      ? 'border-black'
                      : 'border-transparent'
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default First;
