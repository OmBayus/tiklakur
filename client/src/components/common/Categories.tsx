import React from 'react';
import Image from 'next/image';

function Info() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 ">
      {/* Kart 1 */}
      <a
        href="#"
        className="cursor-pointer border-3 rounded-3xl p-6 border-black block"
      >
        <h2 className="font-bold text-lg text-left">E Ticaret</h2>
        <p className="text-sm text-gray-600 text-left">13+</p>
        <div className="w-full aspect-video mt-2 rounded-xl overflow-hidden">
          <Image
            src="/png/images.jpg"
            alt="card"
            width={500}
            height={350}
            className="w-full h-full object-cover border-3 border-black rounded-3xl"
            priority
          />
        </div>
      </a>

      {/* Kart 2 */}
      <a
        href="#"
        className="cursor-pointer border-3 rounded-3xl p-6 border-black block lg:relative lg:top-8 "
      >
        <h2 className="font-bold text-lg text-left">E Ticaret</h2>
        <p className="text-sm text-gray-600 text-left">13+</p>
        <div className="w-full aspect-video mt-2 rounded-xl overflow-hidden">
          <Image
            src="/png/istockphoto-1132817571-612x612.jpg"
            alt="card"
            width={500}
            height={350}
            className="w-full h-full object-cover border-3 border-black rounded-3xl"
            priority
          />
        </div>
      </a>

      {/* Kart 3 */}
      <a
        href="#"
        className="cursor-pointer border-3 rounded-3xl p-6 border-black block "
      >
        <h2 className="font-bold text-lg text-left">E Ticaret</h2>
        <p className="text-sm text-gray-600 text-left">13+</p>
        <div className="w-full aspect-video mt-2 rounded-xl overflow-hidden">
          <Image
            src="/png/o_1ffcdcjhj15db1usov9a18cq1df3r.avif"
            alt="card"
            width={500}
            height={350}
            className="w-full h-full object-cover border-3 border-black rounded-3xl"
            priority
          />
        </div>
      </a>

      {/* Kart 4 */}
      <a
        href="#"
        className="cursor-pointer border-3 rounded-3xl p-6 border-black block lg:relative lg:top-8 "
      >
        <h2 className="font-bold text-lg text-left">E Ticaret</h2>
        <p className="text-sm text-gray-600 text-left">13+</p>
        <div className="w-full aspect-video mt-2 rounded-xl overflow-hidden">
          <Image
            src="/png/altours-travel-agency-react-website-template_335346-original.webp"
            alt="card"
            width={500}
            height={350}
            className="w-full h-full object-cover border-3 border-black rounded-3xl"
            priority
          />
        </div>
      </a>
    </div>
  );
}

export default Info;
