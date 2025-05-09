'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  Maximize,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
  isNew: boolean;
  description?: string;
  features?: string[];
  images?: string[];
  availability: string;
  license: string;
  tags?: string[];
  reviews?: number;
  demoUrl?: string;
  highlights?: string[];
  monthlyPrice?: number;
}

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    title: 'Viasun',
    category: 'HTML',
    price: 19,
    image: '/placeholder.svg?height=1080&width=1920',
    rating: 4.8,
    sales: 234,
    isNew: true,
    description:
      'A clean and modern HTML template perfect for cosmetic stores and beauty brands. Includes responsive design, custom animations, and easy customization options.',
    features: [
      'Responsive design for all devices',
      'Cross-browser compatibility',
      'SEO optimized structure',
      'Fast loading performance',
      'Well-documented code',
    ],
    images: [
      '/placeholder.svg?height=1080&width=1920',
      '/placeholder.svg?height=1080&width=1920&text=Product+Gallery+2',
      '/placeholder.svg?height=1080&width=1920&text=Product+Gallery+3',
      '/placeholder.svg?height=1080&width=1920&text=Product+Gallery+4',
      '/placeholder.svg?height=1080&width=1920&text=Product+Gallery+5',
    ],
    availability: 'In Stock',
    license: 'Regular License',
    tags: ['Cosmetics', 'Beauty', 'E-commerce', 'Responsive'],
    reviews: 42,
    demoUrl: 'https://example.com/demo',
    highlights: [
      '22+ million premium assets & templates',
      'Full AI stack: video, image and audio gen',
      'Lifetime commercial license',
      'Cancel any time',
    ],
    monthlyPrice: 8.99,
  },
  {
    id: 2,
    title: 'Matias',
    category: 'React',
    price: 24,
    image: '/placeholder.svg?height=1080&width=1920&text=Matias',
    rating: 4.9,
    sales: 412,
    isNew: false,
    description:
      'A feature-rich React template with modern UI components and state management. Perfect for dashboards and complex web applications.',
    features: [
      'Built with React 18',
      'Redux state management',
      'Dark and light mode',
      'Customizable components',
      'API integration examples',
    ],
    availability: 'In Stock',
    license: 'Regular License',
  },
  {
    id: 3,
    title: 'Ashley',
    category: 'HTML',
    price: 17,
    image: '/placeholder.svg?height=1080&width=1920&text=Ashley',
    rating: 4.7,
    sales: 187,
    isNew: true,
    availability: 'In Stock',
    license: 'Regular License',
  },
  {
    id: 4,
    title: 'Maxton',
    category: 'HTML',
    price: 22,
    image: '/placeholder.svg?height=1080&width=1920&text=Maxton',
    rating: 4.6,
    sales: 152,
    isNew: false,
    availability: 'In Stock',
    license: 'Regular License',
  },
  {
    id: 5,
    title: 'Grax',
    category: 'React',
    price: 28,
    image: '/placeholder.svg?height=1080&width=1920&text=Grax',
    rating: 4.8,
    sales: 298,
    isNew: true,
    availability: 'In Stock',
    license: 'Regular License',
  },
  {
    id: 6,
    title: 'WowDash',
    category: 'HTML',
    price: 15,
    image: '/placeholder.svg?height=1080&width=1920&text=WowDash',
    rating: 4.3,
    sales: 100,
    isNew: false,
    availability: 'In Stock',
    license: 'Regular License',
  },
  {
    id: 7,
    title: 'Duralux',
    category: 'React',
    price: 34,
    image: '/placeholder.svg?height=1080&width=1920&text=Duralux',
    rating: 4.9,
    sales: 376,
    isNew: true,
    availability: 'In Stock',
    license: 'Regular License',
  },
  {
    id: 8,
    title: 'Open9',
    category: 'HTML',
    price: 18,
    image: '/placeholder.svg?height=1080&width=1920&text=Open9',
    rating: 4.4,
    sales: 163,
    isNew: false,
    availability: 'In Stock',
    license: 'Regular License',
  },
];

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFullscreenGallery, setIsFullscreenGallery] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const productId = Number.parseInt(params.id);
    console.log('Looking for product with ID:', productId);

    // Default to first product if ID is invalid
    let foundProduct = products.find((p) => p.id === productId);

    // If product not found, use the first product as fallback
    if (!foundProduct && products.length > 0) {
      console.log('Product not found, using first product as fallback');
      foundProduct = products[0];
    }

    if (foundProduct) {
      console.log('Product found:', foundProduct.title);
      setProduct(foundProduct);

      // Find related products (same category)
      const related = products
        .filter(
          (p) =>
            p.category === foundProduct.category && p.id !== foundProduct.id,
        )
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      console.error('No products available');
    }
  }, [params.id]);

  const handleAddToCart = () => {
    // In a real app, this would add to cart in state management or localStorage
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    // In a real app, this would toggle wishlist in state management or localStorage
    setIsInWishlist(!isInWishlist);
  };

  const handlePrevImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images!.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) =>
      prev === product.images!.length - 1 ? 0 : prev + 1,
    );
  };

  const toggleFullscreenGallery = () => {
    setIsFullscreenGallery(!isFullscreenGallery);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse text-xl">Loading product...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="w-full px-4 sm:px-8 lg:px-[144px] flex-1 mt-6">
        <motion.div
          className="mt-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Product Images - Now larger and takes more space */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border-2 border-black">
                <Image
                  src={product.images?.[currentImageIndex] || product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                />

                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <button
                  onClick={toggleFullscreenGallery}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="View fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>

                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </div>
                )}
              </div>

              {/* Album Gallery - Thumbnails in a row */}
              {product.images && product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {product.images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-[16/9] rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index
                          ? 'border-black'
                          : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={img || '/placeholder.svg'}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 20vw, 10vw"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Demo button */}
              {product.demoUrl && (
                <div className="mt-4">
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Demo
                  </a>
                </div>
              )}
            </div>

            {/* Product Details - Now takes less space */}
            <div className="w-full lg:w-2/5">
              <div className="sticky top-8">
                <div className="flex items-center gap-2">
                  <Link
                    href="/products"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Templates
                  </Link>
                  <span className="text-sm text-gray-500">/</span>
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold mt-2">
                  {product.title} - Creative Cosmetic Store {product.category}
                </h1>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>
                  <div className="text-gray-500">{product.sales} sales</div>
                </div>

                {/* Subscription box similar to the screenshot */}
                <div className="mt-6 border-2 border-black rounded-xl p-6 bg-white">
                  <h2 className="text-2xl font-bold">
                    Unlimited downloads from ${product.monthlyPrice}/month
                  </h2>

                  <ul className="mt-4 space-y-3">
                    {product.highlights?.map(
                      (highlight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ),
                    )}
                  </ul>

                  <Button className="w-full mt-6 bg-[#a3e635] hover:bg-[#84cc16] text-black font-medium h-12 rounded-md">
                    Subscribe to download
                  </Button>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white hover:bg-gray-800 h-12 rounded-full text-base font-medium"
                  >
                    {isAddedToCart ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </span>
                    )}
                  </Button>

                  <Button
                    onClick={handleToggleWishlist}
                    variant="outline"
                    className="flex-1 border-2 border-black h-12 rounded-full text-base font-medium hover:bg-gray-100"
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${
                        isInWishlist ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                    {isInWishlist ? 'Saved' : 'Add to Collection'}
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Template Information:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">License</p>
                      <p className="font-medium">{product.license}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">File Types</p>
                      <p className="font-medium">HTML, CSS, JS</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Responsive</p>
                      <p className="font-medium">Yes</p>
                    </div>
                  </div>
                </div>

                {product.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-2 border-black px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3"
                >
                  Reviews ({product.reviews || 0})
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3"
                >
                  Support
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-0">
                <div className="bg-white p-6 rounded-xl border-2 border-black">
                  <h3 className="text-xl font-bold mb-4">Product Details</h3>
                  <p className="text-gray-700 mb-4">
                    {product.description ||
                      'No detailed description available for this product.'}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h4 className="font-semibold mb-3">Whats Included</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>All source files</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>6 months of support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Future updates</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {product.category === 'HTML' ? (
                          <>
                            <li className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Basic HTML/CSS knowledge</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Text editor (VS Code, Sublime, etc.)</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Node.js environment</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Basic React knowledge</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>npm or yarn package manager</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="bg-white p-6 rounded-xl border-2 border-black">
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

                  {product.reviews ? (
                    <div className="space-y-6">
                      {/* This would be a map over actual reviews in a real app */}
                      <div className="border-b pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 5
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">
                            Excellent template!
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">
                          This template exceeded my expectations. Clean code,
                          great design, and easy to customize.
                        </p>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span>John D.</span>
                          <span>•</span>
                          <span>2 weeks ago</span>
                        </div>
                      </div>

                      <div className="border-b pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">
                            Good value for money
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">
                          Solid template with good documentation. Saved me a lot
                          of development time.
                        </p>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span>Sarah M.</span>
                          <span>•</span>
                          <span>1 month ago</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-2 border-black rounded-full py-2"
                      >
                        View All Reviews
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No reviews yet for this product.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <div className="bg-white p-6 rounded-xl border-2 border-black">
                  <h3 className="text-xl font-bold mb-4">Support</h3>
                  <p className="text-gray-700 mb-6">
                    Need help with this template? Our support team is here to
                    assist you.
                  </p>

                  <div className="space-y-4">
                    <div className="border-2 border-black rounded-xl p-4">
                      <h4 className="font-semibold mb-2">Documentation</h4>
                      <p className="text-gray-700 mb-3">
                        Check our comprehensive documentation for installation
                        and usage instructions.
                      </p>
                      <Button
                        variant="outline"
                        className="border-2 border-black rounded-full"
                      >
                        View Documentation
                      </Button>
                    </div>

                    <div className="border-2 border-black rounded-xl p-4">
                      <h4 className="font-semibold mb-2">Contact Support</h4>
                      <p className="text-gray-700 mb-3">
                        Have a specific question? Our support team typically
                        responds within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        className="border-2 border-black rounded-full"
                      >
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Templates</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[16/9] rounded-md overflow-hidden">
                      <Image
                        src={relatedProduct.image || '/placeholder.svg'}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                      />
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center shadow">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        {relatedProduct.rating.toFixed(1)}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 right-3 bg-white text-black font-semibold text-sm px-3 py-1 rounded-full">
                          ${relatedProduct.price}
                        </div>
                        <div className="absolute top-3 left-3 pr-10">
                          <h3 className="text-white text-sm font-medium line-clamp-2">
                            {relatedProduct.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {isFullscreenGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreenGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/9]">
            <Image
              src={product.images?.[currentImageIndex] || product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="100vw"
            />

            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images?.map((_: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
