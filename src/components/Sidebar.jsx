import { LayoutDashboard, Boxes, ShoppingCart, Users, Warehouse, FileText, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    name: "Inventario",
    icon: Boxes,
    path: "/inventory",
  },

  {
    name: "Ventas",
    icon: ShoppingCart,
    path: "/sales",
  },

  {
    name: "Clientes",
    icon: Users,
    path: "/clients",
  },

  {
    name: "Bodega",
    icon: Warehouse,
    path: "/warehouse",
  },

  {
    name: "Facturas",
    icon: FileText,
    path: "/reports",
  },

  {
    name: "Reportes",
    icon: BarChart3,
    path: "/reports",
  },

  {
    name: "Configuración",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#151515] border-r border-white/10 hidden md:flex flex-col justify-between">
      
      <div>
        
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-3xl font-bold">
            Soul<span className="text-[#00A3FF]">Garage</span>
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Más control. Menos pérdidas.
          </p>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                to={item.path}
                key={item.name}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#00A3FF]/15 transition-all duration-300 text-left"
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
          <p className="text-sm text-gray-400">
            Administrador
          </p>

          <h3 className="font-semibold mt-1">
            SoulGarage Admin
          </h3>
        </div>
      </div>

    </aside>
  );
}