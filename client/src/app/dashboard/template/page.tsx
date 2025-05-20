'use client';

import Templates from '@/components/common/TemplatesCard';

export default function TemplatesPage() {
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

  return (
    <div className="w-full   space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold">Templatelerim</h1>
        <p className="text-sm sm:text-base text-gray-700">
          Kayıtlı teklif şablonlarınızı buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {products.map((product) => (
          <Templates
            key={product.id}
            title={product.title}
            description={product.description}
            category={product.category}
            rating={product.rating}
            price={product.price}
            downloads={product.downloads}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
