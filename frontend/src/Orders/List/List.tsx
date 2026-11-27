
import { useState } from "react";
import Loading from "../../components/Loading";

function List() {
  const orders = [
    {
      categoria: "Farmacia",
      direccion: "Av. Benavides 245",
      nombre: "Valeria",
      precio: 28.75,
      estado: "Pendiente",
    },
    {
      categoria: "Restaurante",
      direccion: "Jr. Huancavelica 118",
      nombre: "Sebastian",
      precio: 42.9,
      estado: "En camino",
    },
    {
      categoria: "Tecnologia",
      direccion: "Calle Lima 802",
      nombre: "Camila",
      precio: 156.49,
      estado: "Entregado",
    },
    {
      categoria: "Abarrotes",
      direccion: "Psje. El Sol 73",
      nombre: "Lucia",
      precio: 35.29,
      estado: "Pendiente",
    },
    {
      categoria: "Mascotas",
      direccion: "Av. Primavera 530",
      nombre: "Andres",
      precio: 67.8,
      estado: "En camino",
    },
    {
      categoria: "Panaderia",
      direccion: "Jr. Los Pinos 214",
      nombre: "Elena",
      precio: 14.5,
      estado: "Entregado",
    },
  ];

  const listEstatus: string[] = [...new Set(orders.map((x) => x.estado))];

  const [estatus, setEstatus] = useState("");
  const [loading] = useState(false);

  const filteredOrders = estatus
    ? orders.filter((order) => order.estado == estatus)
    : orders;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-on-surface">
          Pedidos Registrados
        </h2>

        <select
          value={estatus}
          onChange={(t) => setEstatus(t.target.value)}
          className="w-full h-11 px-3.5 rounded-xl border border-border-subtle bg-surface text-sm text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
          id="productType"
        >
          <option value="">Todos</option>
          {listEstatus.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2.5" id="orderList">
        {loading ? (
          <Loading />
        ) : (
          filteredOrders.map((item) => (
            <article
              className="bg-surface-container-lowest rounded-xl p-4 border border-border-subtle shadow-sm flex flex-col gap-2"
              key={item.nombre}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-on-surface">
                  {item.nombre}
                </span>
                <span className="text-sm font-bold text-primary">
                  ${item.precio.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-secondary">
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-medium">
                  {item.categoria}
                </span>
                <span className="truncate">{item.direccion} #420</span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}


export default List;