'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import User from '@/components/common/Use';

import Categories from '@/components/common/Categories';
import Info from '@/components/common/Info';
import Slider from '@/components/common/Slider';
import First from '@/components/common/First';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="w-full px-4 sm:px-8 lg:px-[144px] flex-1 mt-6">
        {/* Navbar (Sabit) */}
        <Navbar />

        {/* First */}
        <motion.div
          className="mt-6 sm:mt-15 md:mt-15"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <First />
        </motion.div>

        {/* Info */}
        <motion.div
          className="mt-6 sm:mt-15 md:mt-50"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Info />
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mt-6 sm:mt-10 md:mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Categories />
        </motion.div>
      </div>

      {/* Slider */}
      <motion.div
        className="hidden sm:block mt-10 sm:mt-14 md:mt-60"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Slider />
      </motion.div>

      {/* Alt içerikler */}
      <div className="w-full px-4 sm:px-8 lg:px-[144px] mt-10 sm:mt-14 md:mt-50">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <User
            isReversed
            title="Our Superior"
            subtitle="Team"
            buttonText="Adım 1"
            heading="Lorem Ipsum is simply dummyıhluılh text of the"
            paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          />
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-14 md:mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <User
            isReversed={false}
            title="Our Superior"
            subtitle="Team"
            buttonText="Adım 2"
            heading="Lorem Ipsum is simply dummy text of the"
            paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          />
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-14 md:mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <User
            isReversed
            title="Our Superior"
            subtitle="Team"
            buttonText="Adım 3"
            heading="Lorem Ipsum is simply dummy text of the"
            paragraph="Lorem Ipsum is simply dummy text of thergd printing and typesetting industry..."
          />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="w-full bg-[#F5F5F5] mt-30"
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
