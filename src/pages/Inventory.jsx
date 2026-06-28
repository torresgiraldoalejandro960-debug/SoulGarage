import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Package, Loader2 } from "lucide-react";
import { supabase } from "../services/SupabaseClient";

// ─── Formulario vacío ──────────────────────────────────────────────────────────
const emptyForm = {
  name: "",
  description: "",
  category: "",
  brand: "",
  model: "",
  year: "",
  type: "Genérico",
  cost_price: "",
  sale_price: "",
  stock: "",
  location: "",
};

// ─── Componente principal ──────────────────────────────────────────────────────
export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // ── Cargar productos desde Supabase al montar ──
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Error al cargar los productos.");
      console.error(error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }

  // ── Filtro de búsqueda ──
  const filtered = products.filter((p) =>
    [p.name, p.brand, p.model, p.category, p.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ── Abrir modal para agregar ──
  function handleOpenAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowModal(true);
  }

  // ── Abrir modal para editar ──
  function handleOpenEdit(product) {
    setForm({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      brand: product.brand || "",
      model: product.model || "",
      year: product.year || "",
      type: product.type || "Genérico",
      cost_price: product.cost_price || "",
      sale_price: product.sale_price || "",
      stock: product.stock || "",
      location: product.location || "",
    });
    setEditingId(product.id);
    setError(null);
    setShowModal(true);
  }

  // ── Cerrar modal ──
  function handleClose() {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }

  // ── Guardar (agregar o editar) ──
  async function handleSave() {
    if (!form.name.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }
    if (!form.sale_price) {
      setError("El precio de venta es obligatorio.");
      return;
    }
    if (!form.stock && form.stock !== 0) {
      setError("El stock es obligatorio.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: form.year.trim(),
      type: form.type,
      cost_price: Number(form.cost_price) || 0,
      sale_price: Number(form.sale_price),
      stock: Number(form.stock),
      location: form.location.trim(),
    };

    if (editingId) {
      // Editar existente
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        setError("Error al actualizar el producto.");
        console.error(error);
        setSaving(false);
        return;
      }
    } else {
      // Agregar nuevo
      const { error } = await supabase
        .from("products")
        .insert([payload]);

      if (error) {
        setError("Error al agregar el producto.");
        console.error(error);
        setSaving(false);
        return;
      }
    }

    await fetchProducts();
    setSaving(false);
    handleClose();
  }

  // ── Eliminar ──
  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este producto?")) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // ── Color de stock ──
  function stockColor(stock) {
    if (stock <= 3) return "bg-red-500/20 text-red-400";
    if (stock <= 8) return "bg-yellow-500/20 text-yellow-400";
    return "bg-green-500/20 text-green-400";
  }

  function stockLabel(stock) {
    if (stock <= 3) return "Crítico";
    if (stock <= 8) return "Bajo";
    return "Disponible";
  }

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">Inventario</h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            {loading ? "Cargando..." : `${products.length} productos registrados`}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#00A3FF] hover:bg-[#008AE0] transition-all px-5 py-3 rounded-2xl font-semibold text-sm self-start sm:self-auto"
        >
          <Plus size={18} />
          Agregar producto
        </button>
      </div>

      {/* ── Buscador ── */}
      <input
        type="text"
        placeholder="Buscar por nombre, marca, modelo, categoría o ubicación..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#151515] border border-white/10 rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#00A3FF]/50 placeholder-gray-500 transition-all"
      />

      {/* ── Tabla ── */}
      <div className="bg-[#151515] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-white/5 text-gray-400 text-sm">
              <tr>
                <th className="text-left p-4 md:p-5">Producto</th>
                <th className="text-left p-4 md:p-5">Categoría</th>
                <th className="text-left p-4 md:p-5">Marca / Modelo</th>
                <th className="text-left p-4 md:p-5">Stock</th>
                <th className="text-left p-4 md:p-5">Precio venta</th>
                <th className="text-left p-4 md:p-5">Ubicación</th>
                <th className="text-left p-4 md:p-5">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-500">
                    <Loader2 size={32} className="mx-auto mb-3 animate-spin opacity-40" />
                    <p>Cargando productos...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-500">
                    <Package size={40} className="mx-auto mb-3 opacity-30" />
                    <p>{search ? "No se encontraron productos" : "Aún no hay productos. ¡Agrega el primero!"}</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4 md:p-5">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{product.type}</p>
                    </td>
                    <td className="p-4 md:p-5 text-sm text-gray-300">{product.category || "—"}</td>
                    <td className="p-4 md:p-5 text-sm text-gray-300">
                      {product.brand || "—"}
                      {product.model && <span className="text-gray-500"> / {product.model}</span>}
                    </td>
                    <td className="p-4 md:p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockColor(product.stock)}`}>
                        {product.stock} — {stockLabel(product.stock)}
                      </span>
                    </td>
                    <td className="p-4 md:p-5 text-sm font-medium text-[#00FFB2]">
                      ${Number(product.sale_price).toLocaleString("es-CO")}
                    </td>
                    <td className="p-4 md:p-5 text-sm text-gray-300">{product.location || "—"}</td>
                    <td className="p-4 md:p-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#00A3FF]/10 hover:bg-[#00A3FF]/25 text-[#00A3FF] transition-all"
                          title="Editar"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Cabecera */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#151515] z-10">
              <h2 className="text-xl font-bold">
                {editingId ? "Editar producto" : "Nuevo producto"}
              </h2>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo */}
            <div className="p-6 space-y-4">

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Fila 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nombre del producto *">
                  <input
                    type="text"
                    placeholder="Ej: Pastillas de freno"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Field>
                <Field label="Categoría">
                  <input
                    type="text"
                    placeholder="Ej: Frenos, Lubricantes..."
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </Field>
              </div>

              {/* Fila 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Marca">
                  <input
                    type="text"
                    placeholder="Honda, Yamaha..."
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  />
                </Field>
                <Field label="Modelo">
                  <input
                    type="text"
                    placeholder="CB190R, FZ25..."
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                  />
                </Field>
                <Field label="Año">
                  <input
                    type="text"
                    placeholder="2022"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                  />
                </Field>
              </div>

              {/* Fila 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Precio costo">
                  <input
                    type="number"
                    placeholder="0"
                    value={form.cost_price}
                    onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
                  />
                </Field>
                <Field label="Precio venta *">
                  <input
                    type="number"
                    placeholder="0"
                    value={form.sale_price}
                    onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
                  />
                </Field>
                <Field label="Stock *">
                  <input
                    type="number"
                    placeholder="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  />
                </Field>
              </div>

              {/* Fila 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Tipo">
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="Original">Original</option>
                    <option value="Genérico">Genérico</option>
                  </select>
                </Field>
                <Field label="Ubicación en bodega">
                  <input
                    type="text"
                    placeholder="Ej: Caja B19, Estante A2..."
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </Field>
              </div>

              {/* Descripción */}
              <Field label="Descripción">
                <textarea
                  rows={3}
                  placeholder="Descripción opcional del producto..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="resize-none"
                />
              </Field>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={handleClose}
                disabled={saving}
                className="px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-sm disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00A3FF] hover:bg-[#008AE0] transition-all font-semibold text-sm disabled:opacity-50"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                {editingId ? "Guardar cambios" : "Agregar producto"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ─── Campo de formulario reutilizable ─────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-400 font-medium">{label}</label>
      <div className="[&>input]:w-full [&>input]:bg-[#0D0D0D] [&>input]:border [&>input]:border-white/10 [&>input]:rounded-xl [&>input]:px-4 [&>input]:py-2.5 [&>input]:text-sm [&>input]:outline-none [&>input]:focus:border-[#00A3FF]/50 [&>input]:transition-all [&>input]:placeholder-gray-600 [&>select]:w-full [&>select]:bg-[#0D0D0D] [&>select]:border [&>select]:border-white/10 [&>select]:rounded-xl [&>select]:px-4 [&>select]:py-2.5 [&>select]:text-sm [&>select]:outline-none [&>select]:focus:border-[#00A3FF]/50 [&>select]:transition-all [&>textarea]:w-full [&>textarea]:bg-[#0D0D0D] [&>textarea]:border [&>textarea]:border-white/10 [&>textarea]:rounded-xl [&>textarea]:px-4 [&>textarea]:py-2.5 [&>textarea]:text-sm [&>textarea]:outline-none [&>textarea]:focus:border-[#00A3FF]/50 [&>textarea]:transition-all [&>textarea]:placeholder-gray-600">
        {children}
      </div>
    </div>
  );
}