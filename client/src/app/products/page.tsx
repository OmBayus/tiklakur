'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const products = [
  {
    id: 1,
    title: 'Viasun',
    category: 'HTML',
    price: 19,
    image: '/png/images.jpg',
    rating: 4.8,
    sales: 234,
    isNew: true,
  },
  {
    id: 2,
    title: 'Matias',
    category: 'React',
    price: 24,
    image: '/png/images.jpg',
    rating: 4.9,
    sales: 412,
    isNew: false,
  },
  {
    id: 3,
    title: 'Ashley',
    category: 'HTML',
    price: 17,
    image: '/png/images.jpg',
    rating: 4.7,
    sales: 187,
    isNew: true,
  },
  {
    id: 4,
    title: 'Maxton',
    category: 'HTML',
    price: 22,
    image: '/png/images.jpg',
    rating: 4.6,
    sales: 152,
    isNew: false,
  },
  {
    id: 5,
    title: 'Grax',
    category: 'React',
    price: 28,
    image: '/png/images.jpg',
    rating: 4.8,
    sales: 298,
    isNew: true,
  },
  {
    id: 6,
    title: 'WowDash',
    category: 'HTML',
    price: 15,
    image: '/png/images.jpg',
    rating: 4.3,
    sales: 100,
    isNew: false,
  },
  {
    id: 7,
    title: 'Duralux',
    category: 'React',
    price: 34,
    image: '/png/images.jpg',
    rating: 4.9,
    sales: 376,
    isNew: true,
  },
  {
    id: 8,
    title: 'Open9',
    category: 'HTML',
    price: 18,
    image: '/png/images.jpg',
    rating: 4.4,
    sales: 163,
    isNew: false,
  },
];

const serviceTypes = [
  { name: 'HTML Templates', count: 482 },
  { name: 'React Templates', count: 261 },
];

const budgetRanges = [
  { name: 'Under $20', value: 'under-20' },
  { name: '$20 to $50', value: '20-50' },
  { name: '$50 to $100', value: '50-100' },
  { name: 'Over $100', value: 'over-100' },
];

const deliveryTimes = [
  { name: 'Ready to use', value: 'ready' },
  { name: 'With customization', value: 'custom' },
];

export default function Products() {
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    [],
  );
  const [selectedBudget, setSelectedBudget] = useState<string>('any');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('any');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  useEffect(() => {
    let result = [...products];

    if (selectedServiceTypes.length > 0) {
      result = result.filter((product) =>
        selectedServiceTypes.some(
          (type) =>
            (type === 'HTML Templates' && product.category === 'HTML') ||
            (type === 'React Templates' && product.category === 'React'),
        ),
      );
    }

    if (selectedBudget !== 'any') {
      result = result.filter((product) => {
        if (selectedBudget === 'under-20') return product.price < 20;
        if (selectedBudget === '20-50')
          return product.price >= 20 && product.price <= 50;
        if (selectedBudget === '50-100')
          return product.price > 50 && product.price <= 100;
        if (selectedBudget === 'over-100') return product.price > 100;
        return true;
      });
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.sales - a.sales);
        break;
      case 'newest':
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result);
  }, [selectedServiceTypes, selectedBudget, selectedDelivery, sortBy]);

  const toggleServiceType = (type: string) => {
    setSelectedServiceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="w-full px-4 sm:px-8 lg:px-[144px] flex-1 mt-6">
        <Navbar />

        <motion.div
          className="mt-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className=" text-black py-8 px-6 border-2 border-black rounded-3xl ">
            <h1 className="text-3xl font-bold mb-2">Web Templates</h1>
            <p className="text-lg max-w-3xl">
              Discover professional web templates for your next project.
            </p>
            <p className="mt-2 text-sm">
              Showing {filteredProducts.length} of {products.length} templates
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Select open={isServiceOpen} onOpenChange={setIsServiceOpen}>
              <SelectTrigger
                className={`w-[180px] border-2 border-black cursor-pointer ${
                  isServiceOpen ? 'font-bold' : ''
                } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none`}
              >
                <span className="flex items-center">Service Type</span>
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <div
                    key={type.name}
                    className="flex items-center space-x-2 px-2 py-1"
                  >
                    <Checkbox
                      id={`service-${type.name}`}
                      checked={selectedServiceTypes.includes(type.name)}
                      onCheckedChange={() => toggleServiceType(type.name)}
                    />
                    <label
                      htmlFor={`service-${type.name}`}
                      className="text-sm flex justify-between w-full cursor-pointer"
                    >
                      <span>{type.name}</span>
                      <span className="text-muted-foreground">
                        ({type.count})
                      </span>
                    </label>
                  </div>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedBudget}
              onValueChange={setSelectedBudget}
              open={isBudgetOpen}
              onOpenChange={setIsBudgetOpen}
            >
              <SelectTrigger
                className={`w-[150px] border-2 border-black ${
                  isBudgetOpen ? 'font-bold' : ''
                } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none`}
              >
                Budget
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {budgetRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDelivery}
              onValueChange={setSelectedDelivery}
              open={isDeliveryOpen}
              onOpenChange={setIsDeliveryOpen}
            >
              <SelectTrigger
                className={`w-[180px] border-2 border-black ${
                  isDeliveryOpen ? 'font-bold' : ''
                } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none`}
              >
                Delivery Time
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {deliveryTimes.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Sort:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-[16/9] rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center shadow">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 right-3 bg-white text-black font-semibold text-sm px-3 py-1 rounded-full">
                      ${product.price}
                    </div>
                    <div className="absolute top-3 left-3 pr-10">
                      <h3 className="text-white text-sm font-medium line-clamp-2">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-full bg-[#F5F5F5] mt-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </main>
  );
}
