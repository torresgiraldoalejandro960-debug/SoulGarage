import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  Users,
  Warehouse,
  FileText,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard",      icon: LayoutDashboard, path: "/" },
  { name: "Inventario",     icon: Boxes,           path: "/inventory" },
  { name: "Ventas",         icon: ShoppingCart,    path: "/sales" },
  { name: "Clientes",       icon: Users,           path: "/clients" },
  { name: "Bodega",         icon: Warehouse,       path: "/warehouse" },
  { name: "Facturas",       icon: FileText,        path: "/invoices" },
  { name: "Reportes",       icon: BarChart3,       path: "/reports" },
  { name: "Configuración",  icon: Settings,        path: "/settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay oscuro en móvil cuando el sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          w-72 bg-[#151515] border-r border-white/10
          flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Soul<span className="text-[#00A3FF]">Garage</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Más control. Menos pérdidas.
              </p>
            </div>

            {/* Botón cerrar — solo visible en móvil */}
            <button
              onClick={onClose}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menú */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  to={item.path}
                  key={item.name}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left
                    ${
                      isActive
                        ? "bg-[#00A3FF]/20 text-[#00A3FF] font-semibold"
                        : "text-gray-300 hover:bg-[#00A3FF]/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4">
          <div className="bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-2xl p-4">
            <p className="text-sm text-gray-400">Administrador</p>
            <h3 className="font-semibold mt-1">SoulGarage Admin</h3>
          </div>
        </div>
      </aside>
    </>
  );
}
