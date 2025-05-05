import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Adım1 from '@/components/common/Adım1';
import Adım2 from '@/components/common/Adım2';
import Adım3 from '@/components/common/Adım3';
import Categories from '@/components/common/Categories';
import Info from '@/components/common/Info';
import Slider from '@/components/common/Slider';
import First from '@/components/common/First';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="w-full px-4 sm:px-8 lg:px-[144px] flex-1 mt-6">
        {/* Navbar */}
        <Navbar />

        {/* First */}
        <div className="mt-6 sm:mt-15 md:mt-15">
          <First />
        </div>

        {/* Info */}
        <div className="mt-6 sm:mt-15 md:mt-50">
          <Info />
        </div>

        {/* Categories */}
        <div className="mt-6 sm:mt-10 md:mt-20">
          <Categories />
        </div>
      </div>

      {/* Slider */}
      <div className="mt-10 sm:mt-14 md:mt-60">
        <Slider />
      </div>

      {/* Alt içerikler */}
      <div className="w-full px-4 sm:px-8 lg:px-[144px] mt-10 sm:mt-14 md:mt-50">
        <Adım1 />
        <div className="mt-10 sm:mt-14 md:mt-20">
          <Adım2 />
        </div>
        <div className="mt-10 sm:mt-14 md:mt-20">
          <Adım3 />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#F5F5F5] mt-50">
        <Footer />
      </div>
    </main>
  );
}
