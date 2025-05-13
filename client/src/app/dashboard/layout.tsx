import Sidebar from '@/components/common/Sidebar';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Üstte navbar */}

      <Navbar />

      {/* Alt kısım: Sidebar solda, içerik sağda */}
      <div className="flex flex-1 w-full mt-[2%] px-[144px] mb-[8%]  ">
        {/* Sol sabit menü */}
        <Sidebar />

        {/* Sağda değişen içerik */}
        <main className="flex-1 p-6 bg-white overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
