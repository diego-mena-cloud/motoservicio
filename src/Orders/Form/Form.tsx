import { useState, type FormEvent } from "react";

function Form() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [referencia, setReferencia] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log("El clientes se llama: ", nombre);
    console.log("El tipo de su paquete es: ", tipo);
    console.log("La referencia de su casa es:", referencia);
    console.log("Se le va a cobrar: ", precio);
  };

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-5 border border-border-subtle shadow-sm flex flex-col gap-4">
      <div>
        <h1 className="text-base font-bold text-on-surface">
          Registrar Pedido
        </h1>
        <p className="text-xs text-secondary mt-0.5">
          Ingresa los datos esenciales de la carrera
        </p>
      </div>
      <form
        className="flex flex-col gap-3.5"
        id="orderForm"
        onSubmit={handleSubmit}
      >
        {/* Nombre del Cliente  */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">
            Nombre del Cliente
          </label>
          <input
            className="w-full h-11 px-3.5 rounded-xl border border-border-subtle bg-surface text-sm text-on-surface placeholder:text-secondary/50 focus:outline-none focus:border-primary focus:bg-white transition-all"
            id="clientName"
            placeholder="Ej. Farmacia San José"
            required
            type="text"
            value={nombre}
            onChange={(n) => setNombre(n.target.value)}
          />
        </div>
        {/* Tipo de Producto */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">
            Tipo de Producto
          </label>
          <select
            value={tipo}
            onChange={(t) => setTipo(t.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-border-subtle bg-surface text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
            id="productType"
          >
            <option value="Medicinas / Farmacia">Medicinas / Farmacia</option>
            <option value="Comida preparada">Comida preparada</option>
            <option value="Documentos / Sobres">Documentos / Sobres</option>
            <option value="Paquetería liviana">Paquetería liviana</option>
            <option value="Repuestos">Repuestos</option>
          </select>
        </div>
        {/* Referencia del Destino / Dirección */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">
            Referencia del Destino / Dirección
          </label>
          <input
            className="w-full h-11 px-3.5 rounded-xl border border-border-subtle bg-surface text-sm text-on-surface placeholder:text-secondary/50 focus:outline-none focus:border-primary focus:bg-white transition-all"
            id="destAddress"
            placeholder="Ej. Av. Las Camelias #420"
            required
            type="text"
            value={referencia}
            onChange={(r) => setReferencia(r.target.value)}
          />
        </div>
        {/* Costo del Servicio */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">
            Costo del Servicio ($)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-sm font-bold text-secondary">
              $
            </span>
            <input
              className="w-full h-11 pl-8 pr-3.5 rounded-xl border border-border-subtle bg-surface text-sm font-semibold text-on-surface placeholder:text-secondary/50 focus:outline-none focus:border-primary focus:bg-white transition-all"
              id="serviceCost"
              min="0"
              placeholder="0.00"
              required
              step="0.25"
              type="number"
              value={precio}
              onChange={(p) => setPrecio(p.target.value)}
            />
          </div>
        </div>
        {/* Botón Directo y Sobrio */}
        <button
          className="mt-1.5 w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm"
          type="submit"
        >
          <span className="material-symbols-outlined text-[18px]">
            navigation
          </span>
          <span>Guardar Pedido / Trazar Ruta</span>
        </button>
      </form>
    </section>
  );
}

export default Form;
