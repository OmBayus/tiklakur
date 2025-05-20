import { Star, Users } from 'lucide-react';
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

export default function ProductCard({
  title,
  description,
  category,
  rating,
  price,
  downloads,
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
      <div className="bg-gradient-to-b from-white/90 to-gray-50 px-6 py-6">
        <div className="flex justify-between items-center gap-4">
          {/* Sol Blok */}
          <div className="flex flex-col justify-between flex-1 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {description}
            </p>

            {/* Rating + Downloads */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-violet-500 stroke-violet-500" />
                <span className="text-base font-medium text-gray-900">
                  {rating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-violet-500" />
                <span className="text-sm font-medium text-gray-700">
                  {downloads}
                </span>
              </div>
            </div>
          </div>

          {/* Sağ Blok - Fiyat */}
          <div className="flex flex-col items-center justify-center bg-gray-900 text-white px-10 py-3 rounded-full shrink-0 h-fit transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-black">
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-xs text-gray-300">/month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
