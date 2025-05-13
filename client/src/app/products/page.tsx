'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

import ProductCard from '@/components/common/ProductCard';
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
    title: 'Viasun Shop',
    category: 'HTML',
    price: 19,
    imageSrc: '/png/deneme.jpg',
    rating: 4.8,
    pages: 8,
    downloads: 234,
    description: 'Modern ve hızlı e-ticaret şablonu',
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
  {
    id: 4,
    title: 'Maxton Admin',
    category: 'HTML',
    price: 22,
    imageSrc: '/png/deneme.jpg',
    rating: 4.6,
    pages: 14,
    downloads: 152,
    description: 'Yönetim paneli şablonu',
  },
  {
    id: 5,
    title: 'Grax Landing',
    category: 'React',
    price: 28,
    imageSrc: '/png/deneme.jpg',
    rating: 4.8,
    pages: 4,
    downloads: 298,
    description: 'Startup için landing page',
  },
  {
    id: 6,
    title: 'WowDash Dashboard',
    category: 'HTML',
    price: 15,
    imageSrc: '/png/deneme.jpg',
    rating: 4.3,
    pages: 10,
    downloads: 100,
    description: 'Minimalist dashboard şablonu',
  },
  {
    id: 7,
    title: 'Duralux Portfolio',
    category: 'React',
    price: 34,
    imageSrc: '/png/deneme.jpg',
    rating: 4.9,
    pages: 7,
    downloads: 376,
    description: 'Yaratıcı portföy sitesi',
  },
  {
    id: 8,
    title: 'Open9 Agency',
    category: 'HTML',
    price: 18,
    imageSrc: '/png/deneme.jpg',
    rating: 4.4,
    pages: 9,
    downloads: 163,
    description: 'Ajanslar için modern şablon',
  },
  {
    id: 9,
    title: 'Flexify SaaS',
    category: 'React',
    price: 39,
    imageSrc: '/png/deneme.jpg',
    rating: 5.0,
    pages: 15,
    downloads: 500,
    description: 'SaaS projeleri için profesyonel template',
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
  const [isSortOpen, setIsSortOpen] = useState(false);

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
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
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
      <Navbar />
      <div className="w-full px-4 sm:px-8 lg:px-[144px] flex-1 mt-6">
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
          <div className="flex flex-wrap items-center gap-3 ">
            <Select open={isServiceOpen} onOpenChange={setIsServiceOpen}>
              <SelectTrigger
                className={`w-[180px] rounded-3xl border-2 border-black cursor-pointer ${
                  isServiceOpen ? 'font-bold' : ''
                } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none`}
              >
                <span className="flex items-center ">Service Type</span>
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
                className={`w-[150px] rounded-3xl border-2 border-black cursor-pointer ${
                  isBudgetOpen || selectedBudget !== 'any' ? 'font-bold' : ''
                } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none`}
              >
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {budgetRanges.map((range) => (
                  <SelectItem
                    key={range.value}
                    value={range.value}
                    className={
                      selectedBudget === range.value
                        ? 'font-semibold bg-gray-100'
                        : ''
                    }
                  >
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
                className={`w-[180px] rounded-3xl border-2 border-black cursor-pointer ${
                  isDeliveryOpen || selectedDelivery !== 'any'
                    ? 'font-bold'
                    : ''
                } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none`}
              >
                <SelectValue placeholder="Delivery Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {deliveryTimes.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className={
                      selectedDelivery === time.value
                        ? 'font-semibold bg-gray-100'
                        : ''
                    }
                  >
                    {time.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto ">
              <Select
                value={sortBy}
                onValueChange={setSortBy}
                open={isSortOpen}
                onOpenChange={setIsSortOpen}
              >
                <SelectTrigger
                  className={`w-[200px] rounded-3xl border-2 cursor-pointer border-black ${
                    isSortOpen || sortBy !== 'popular' ? 'font-bold' : ''
                  } focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none flex justify-between items-center px-3`}
                >
                  <span
                    className={`text-sm text-gray-700 ${
                      sortBy !== 'popular' ? 'font-bold' : ''
                    }`}
                  >
                    Sort:
                  </span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-xs font-bold text-gray-500">
                      Sort:
                    </span>
                    <div className="border-b border-gray-300 mt-1"></div>
                  </div>
                  <SelectItem value="popular">Most Popular</SelectItem>

                  <SelectItem value="price-low">Low to High</SelectItem>
                  <SelectItem value="price-high">High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Ürünler grid */}
        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
            {filteredProducts.map((product) => (
              <ProductCard
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
