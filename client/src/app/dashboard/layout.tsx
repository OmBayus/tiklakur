import Sidebar from '@/components/common/Sidebar';
import NavbarRegister from '@/components/common/NavbarRegister';
import Footer from '@/components/common/Footer';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Üstte navbar */}
      <div className="xl:px-[144px]  md:px-[28px] sm:px-[8px] ">
        <NavbarRegister />
      </div>

      {/* Alt kısım: Sidebar solda, içerik sağda */}
      <div className="flex flex-1 w-full mt-[2%] xl:px-[144px] md:px-[44px] sm:px-[22px]  px-[18px] mb-[2%]   ">
        {/* Sol sabit menü */}
        <Sidebar />

        {/* Sağda değişen içerik */}
        <main className="flex-1   bg-white overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
