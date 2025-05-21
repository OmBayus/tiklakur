'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/common/ProductCard';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
};

const getFadeUp = (i = 0) => ({
  opacity: 1,
  y: 0,
  transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
});

const products = [
  {
    id: 1,
    title: 'Viasun Shop',
    category: 'HTML',
    price: 19,
    imageSrc: '/png/deneme.jpg',
    rating: 4.8,
    pages: 8,
    downloads: 234,
    description: 'Modern ve hızlı e-ticaret',
  },
  {
    id: 2,
    title: 'Matias React',
    category: 'React',
    price: 24,
    imageSrc: '/png/deneme.jpg',
    rating: 4.9,
    pages: 12,
    downloads: 412,
    description: 'Çok amaçlı React template',
  },
  {
    id: 3,
    title: 'Ashley Blog',
    category: 'HTML',
    price: 17,
    imageSrc: '/png/deneme.jpg',
    rating: 4.7,
    pages: 6,
    downloads: 187,
    description: 'Kişisel blog için şık tasarım',
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      {/* Karşılama Alanı */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Merhaba Cemil 👋</h1>
          <p className="text-gray-700 text-sm sm:text-base">
            TıklaKur a tekrar hoş geldin! Sol menüden işlemlerine ulaşabilirsin.
          </p>
        </div>
      </div>

      {/* Öneriler */}
      <p className="text-xl sm:text-2xl font-bold mt-12">
        Sizin için Önerilenler!
      </p>

      {/* Ürün Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial="hidden"
            whileInView={getFadeUp(index)}
            variants={fadeUpVariant}
            viewport={{ once: true }}
            className="min-w-0 w-full"
          >
            <ProductCard
              title={product.title}
              description={product.description}
              category={product.category}
              rating={product.rating}
              price={product.price}
              downloads={product.downloads}
              imageSrc={product.imageSrc}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
