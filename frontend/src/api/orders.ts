import { request } from "./client";

export type OrderReferences = {
  cliente_id: number;
  categoria_id: number;
  repartidor_id: number;
  estado_id: number;
};
// estructura Payload Frontend manda al Backend
export type NewOrder = OrderReferences & {
  direccion_destino: string;
  precio: string;
  estado_id?: number;
  descripcion?: string;
  direccion_origen?: string;
  origen_lat?: string;
  origen_lng?: string;
  destino_lat?: string;
  destino_lng?: string;
  distancia_km?: string;
  duracion_min?: string;
};
// estructura que Backend regresa al Frontend
export type Order = OrderReferences & {
  id: number;
  cliente: string;
  categoria: string;
  repartidor: string;
  estado: string;
  estado_color: string;
  descripcion: string | null;
  direccion_origen: string | null;
  origen_lat: string | null;
  origen_lng: string | null;
  direccion_destino: string;
  destino_lat: string | null;
  destino_lng: string | null;
  distancia_km: string | null;
  duracion_min: string | null;
  precio: string;
  creado_en: string;
};

export const getOrders = () => request<Order[]>("/api/pedidos");
