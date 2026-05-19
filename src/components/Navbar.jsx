import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-white/10 bg-[#151515]/80 backdrop-blur-md flex items-center justify-between px-6">
      
      {/* Search */}
      <div className="flex items-center gap-3 bg-[#0D0D0D] px-4 py-3 rounded-2xl w-[400px]">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Buscar productos, clientes o motos..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        <button className="w-12 h-12 rounded-2xl bg-[#0D0D0D] flex items-center justify-center hover:bg-[#00A3FF]/20 transition-all">
          <Bell size={20} />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#00A3FF] flex items-center justify-center font-bold">
          A
        </div>

      </div>
    </header>
  );
}