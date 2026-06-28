import { Bell, Search, Menu } from "lucide-react";

export default function Navbar({ onMenuOpen }) {
  return (
    <header className="h-20 border-b border-white/10 bg-[#151515]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 gap-3">

      {/* Botón hamburguesa — solo en móvil */}
      <button
        onClick={onMenuOpen}
        className="md:hidden w-11 h-11 rounded-2xl bg-[#0D0D0D] flex items-center justify-center hover:bg-[#00A3FF]/20 transition-all flex-shrink-0"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      {/* Buscador */}
      <div className="flex items-center gap-3 bg-[#0D0D0D] px-4 py-3 rounded-2xl flex-1 max-w-[420px]">
        <Search size={18} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar productos, clientes o motos..."
          className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
        />
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="w-11 h-11 rounded-2xl bg-[#0D0D0D] flex items-center justify-center hover:bg-[#00A3FF]/20 transition-all">
          <Bell size={20} />
        </button>

        <div className="w-11 h-11 rounded-2xl bg-[#00A3FF] flex items-center justify-center font-bold text-sm">
          A
        </div>
      </div>

    </header>
  );
}
