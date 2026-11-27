import { useState } from "react";
import { useApi } from "../../Hooks/useApi";
import { getOrders } from "../../api/orders";

function List() {
  const { data: orders, error, loading } = useApi(getOrders, []);

  const listEstatus: string[] = [...new Set(orders.map((x) => x.estado))];

  const [estatus, setEstatus] = useState("");

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

      {error && (
        <p className="text-sm text-red-600 px-1">
          No se pudieron cargar los pedidos
        </p>
      )}
      {loading ? (
        <div className="relative items-center block max-w-sm p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-heading opacity-20">
            Cargando pedidos
          </h5>
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5" id="orderList">
          {filteredOrders.map((item) => (
            <article
              className="bg-surface-container-lowest rounded-xl p-4 border border-border-subtle shadow-sm flex flex-col gap-2"
              key={item.id}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-on-surface">
                  {item.cliente}
                </span>
                <span className="text-sm font-bold text-primary">
                  ${item.precio}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-medium">
                  {item.categoria}
                </span>
                <span className="truncate">{item.direccion_destino} #420</span>
              </div>
              {item.descripcion}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default List;
