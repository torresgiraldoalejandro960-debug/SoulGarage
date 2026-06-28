import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#0D0D0D] text-white min-h-screen">

      {/* Sidebar — recibe estado y función para cerrar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Navbar — recibe función para abrir sidebar */}
        <Navbar onMenuOpen={() => setSidebarOpen(true)} />

        <main className="w-full p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
}
