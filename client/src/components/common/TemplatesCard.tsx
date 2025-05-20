import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  downloads: number;
  imageSrc: string;
}

export default function Templates({
  title,
  description,
  category,

  imageSrc,
}: ProductCardProps) {
  return (
    <div className="group w-full bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      {/* Üst Görsel */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:opacity-0 transition-opacity duration-300"></div>
        <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 border-0 shadow-sm text-xs">
          {category}
        </Badge>
      </div>

      {/* Alt İçerik Alanı */}
      <div className="bg-gradient-to-b from-white/90 to-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Sol Blok */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>

          {/* Sağ Blok - Admin Panel Butonu */}
          <button className="cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-black transition-colors duration-300">
            <span className="  text-sm font-medium">Admin Panel</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
