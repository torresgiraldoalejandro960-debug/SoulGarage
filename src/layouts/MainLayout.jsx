import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-[#0D0D0D] text-white min-h-screen">

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="w-full p-3 md:p-6 overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
}