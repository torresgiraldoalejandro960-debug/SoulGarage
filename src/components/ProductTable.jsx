const products = [
  {
    id: 1,
    name: "Pastillas Freno",
    brand: "Honda",
    stock: 4,
    location: "Caja B19",
    price: "$55.000",
    status: "Bajo",
  },

  {
    id: 2,
    name: "Aceite Motul",
    brand: "Yamaha",
    stock: 20,
    location: "Estante A2",
    price: "$42.000",
    status: "Disponible",
  },

  {
    id: 3,
    name: "Kit Arrastre",
    brand: "Suzuki",
    stock: 8,
    location: "Vitrina C3",
    price: "$180.000",
    status: "Disponible",
  },
];

export default function ProductTable() {
  return (
    <div
      className="
        mt-10
        bg-[#151515]
        border border-white/10
        rounded-2xl md:rounded-3xl
        overflow-hidden
      "
    >

      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        <div>
          <h2 className="px-3 py-2 md:px-5 md:py-3 font-bold">
            Inventario
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Productos registrados.
          </p>
        </div>

        <button
          className="
            bg-[#00A3FF]
            hover:bg-[#008AE0]
            transition-all
            px-5
            py-3
            rounded-2xl
            font-semibold
          "
        >
          + Agregar
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-white/5 text-gray-400 text-sm">
            <tr>
              <th className="text-left p-5">
                Producto
              </th>

              <th className="text-left p-5">
                Marca
              </th>

              <th className="text-left p-5">
                Stock
              </th>

              <th className="text-left p-5">
                Ubicación
              </th>

              <th className="text-left p-5">
                Precio
              </th>

              <th className="text-left p-5">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="
                  border-t border-white/5
                  hover:bg-white/5
                  transition-all
                "
              >

                <td className="p-5 font-medium">
                  {product.name}
                </td>

                <td className="p-3 md:">
                  {product.brand}
                </td>

                <td className="p-3 md:p-5 text-xs md:text-sm">
                  {product.stock}
                </td>

                <td className="p-3 md:p-5 text-xs md:text-sm">
                  {product.location}
                </td>

                <td className="p-3 md:p-5 text-xs md:text-sm">
                  {product.price}
                </td>

                <td className="p-3 md:p-5 text-xs md:text-sm">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        product.status === "Bajo"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }
                    `}
                  >
                    {product.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}