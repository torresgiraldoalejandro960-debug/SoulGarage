import StatCard from "../components/StatCard";
import ProductTable from "../components/ProductTable";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Bienvenido a SoulGarage.
        </p>
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          md:gap-6
        "
      >

        <StatCard
          title="Ventas del día"
          value="$1.250.000"
          color="#00FFB2"
        />

        <StatCard
          title="Productos bajos"
          value="12"
          color="#FF3B3B"
        />

        <StatCard
          title="Ganancia semanal"
          value="$5.800.000"
          color="#00A3FF"
        />

        <StatCard
          title="Facturas pendientes"
          value="4"
          color="#FFD166"
        />

      </div>

      {/* Tabla */}
      <ProductTable />

    </div>
  );
}