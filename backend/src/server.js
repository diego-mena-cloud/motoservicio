import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = ["http://localhost:5173", "https://mi-sitio.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
  }),
);

app.use(express.json());
//get .- consultar y devolver datos
//post.- crear un nuevo registro
//patch.- actualizar un registro existente
//delete.- eliminar un registro existente
app.get("/", async (req, res) =>
  res.json({
    message:
      "Bienvenido al backend de mi motoservicio para conectarse al frontend de la app",
  }),
);

app.get("/api/categorias", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre FROM categorias ORDER BY id",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al consultar categorias",
    });
  }
});

app.get("/api/clientes", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nombre, apellido_paterno, apellido_materno,
        telefono, direccion, correo 
        FROM clientes ORDER BY id`,
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al consultar clientes",
    });
  }
});

app.get("/api/pedidos", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
          pedidos.id, 
          pedidos.cliente_id,
          categorias.nombre AS categoria, 
          CONCAT_WS(' ', clientes.nombre, clientes.apellido_paterno, clientes.apellido_materno) AS cliente, 
          pedidos.estado_id,
          estados.nombre AS estado,
          estados.color AS estado_color,
          pedidos.repartidor_id,
          CONCAT_WS(' ', repartidores.nombre, repartidores.apellido_paterno, repartidores.apellido_materno) AS repartidos, 
          pedidos.precio, 
          pedidos.descripcion, 
          pedidos.destino_lat, 
          pedidos.destino_lng, 
          pedidos.creado_en, 
          pedidos.duracion_min, 
          pedidos.distancia_km, 
          pedidos.direccion_origen, 
          pedidos.direccion_destino, 
          pedidos.origen_lat, 
          pedidos.origen_lng,
          pedidos.creado_en
            FROM pedidos
            JOIN clientes ON clientes.id = pedidos.cliente_id
            JOIN categorias ON categorias.id = pedidos.categoria_id
            JOIN estados ON estados.id = pedidos.estado_id
            JOIN repartidores ON repartidores.id = pedidos.repartidor_id 
            ORDER BY pedidos.id DESC`,
    );

    setTimeout(() => {
      res.json(result.rows);
    }, 1000);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al consultar pedidos",
    });
  }
});

app.post("/api/pedidos", async (req, res) => {
  const {
    cliente_id,
    categoria_id,
    repartidor_id,
    estado_id,
    descripcion,
    direccion_origen,
    origen_lat,
    origen_lng,
    direccion_destino,
    destino_lat,
    destino_lng,
    duracion_min,
    distancia_km,
    precio,
  } = req.body;

  // console.log("Datos recibidos:", req.body); // Agrega este log para depuración
  if (
    !cliente_id ||
    !categoria_id ||
    !repartidor_id ||
    !direccion_destino ||
    !precio === undefined
  ) {
    return res.status(400).json({
      error:
        "Los campos cliente, categoria, repartidor, direccion de destino y precio son obligatorios",
    });
  }

  try {
    let pedidioEstadoId = estado_id;
    if (!pedidioEstadoId) {
      const estado = await pool.query(
        "SELECT id FROM estados WHERE nombre = 'Pendiente' LIMIT 1",
      );
      pedidioEstadoId = estado.rows[0].id;
    }
    if (!pedidioEstadoId) {
      return res
        .status(400)
        .json({ error: "No se pudo determinar el estado del pedido" });
    }

    const result = await pool.query(
      `INSERT INTO pedidos 
        (cliente_id, categoria_id, repartidor_id, estado_id, descripcion, direccion_origen, origen_lat, origen_lng, direccion_destino, destino_lat, destino_lng, duracion_min, distancia_km, precio)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
      [
        cliente_id,
        categoria_id,
        repartidor_id,
        pedidioEstadoId,
        descripcion,
        direccion_origen,
        origen_lat,
        origen_lng,
        direccion_destino,
        destino_lat,
        destino_lng,
        duracion_min,
        distancia_km,
        precio,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear el pedido",
    });
  }
});

app.listen(port, () => {
  console.log(`Backend disponible en http://localhost:${port}`);
});
