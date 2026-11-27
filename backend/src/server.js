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

const camposPedido = [
  "cliente_id",
  "categoria_id",
  "repartidor_id",
  "estado_id",
  "precio",
  "descripcion",
  "destino_lat",
  "destino_lng",
  "duracion_min",
  "distancia_km",
  "direccion_origen",
  "direccion_destino",
  "origen_lat",
  "origen_lng",
];

const camposCliente = [
  "nombre",
  "apellido_paterno",
  "apellido_materno",
  "telefono",
  "direccion",
  "correo",
];

const camposCategoria = ["nombre"];

async function actualizarRegistro(req, res, tabla, camposPermitidos, mensaje) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "El id no es valido" });
  }

  const datos = req.body && typeof req.body === "object" && !Array.isArray(req.body)
    ? req.body
    : {};

  const camposRecibidos = Object.keys(datos);

  const camposNoPermitidos = camposRecibidos.filter(
    (campo) => !camposPermitidos.includes(campo)
  );

  if (camposNoPermitidos.length > 0) {
    return res.status(400).json({
      error: `Campos no permitidos: ${camposNoPermitidos.join(", ")}`
    });
  }

  let camposActualizar = camposRecibidos;

  if (req.method === "PUT") {
    const camposFaltantes = camposPermitidos.filter(
      (campo) => !Object.prototype.hasOwnProperty.call(datos, campo)
    );

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error: `Para PUT debes enviar todos los campos: ${camposFaltantes.join(", ")}`
      });
    }

    camposActualizar = camposPermitidos;
  }

  if (camposActualizar.length === 0) {
    return res.status(400).json({
      error: "Debes enviar por lo menos un campo para actualizar"
    });
  }

  const valores = camposActualizar.map((campo) => datos[campo]);

  const instrucciones = camposActualizar
    .map((campo, indice) => `${campo} = $${indice + 1}`)
    .join(", ");

  try {
    const result = await pool.query(
      `UPDATE ${tabla} SET ${instrucciones} WHERE id = $${valores.length + 1} RETURNING *`,
      [...valores, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No se encontro el registro"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: mensaje });
  }
}

app.patch("/api/pedidos/:id/cancelar", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "El id del pedido no es valido"
    });
  }

  try {
    const pedido = await pool.query(
      "SELECT id FROM pedidos WHERE id = $1",
      [id]
    );

    if (pedido.rows.length === 0) {
      return res.status(404).json({
        error: "No se encontro el pedido"
      });
    }

    const estado = await pool.query(
      `INSERT INTO estados (nombre, descripcion, color)
       VALUES ('Cancelado', 'Pedido cancelado', '#EF4444')
       ON CONFLICT (nombre) DO UPDATE
       SET descripcion = EXCLUDED.descripcion, color = EXCLUDED.color
       RETURNING id`
    );

    const result = await pool.query(
      "UPDATE pedidos SET estado_id = $1 WHERE id = $2 RETURNING *",
      [estado.rows[0].id, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al cancelar el pedido"
    });
  }
});

app.patch("/api/pedidos/:id", (req, res) =>
  actualizarRegistro(
    req,
    res,
    "pedidos",
    camposPedido,
    "Error al modificar el pedido"
  )
);

app.put("/api/pedidos/:id", (req, res) =>
  actualizarRegistro(
    req,
    res,
    "pedidos",
    camposPedido,
    "Error al reemplazar el pedido"
  )
);

app.patch("/api/clientes/:id", (req, res) =>
  actualizarRegistro(
    req,
    res,
    "clientes",
    camposCliente,
    "Error al modificar el cliente"
  )
);

app.put("/api/clientes/:id", (req, res) =>
  actualizarRegistro(
    req,
    res,
    "clientes",
    camposCliente,
    "Error al reemplazar el cliente"
  )
);

app.patch("/api/categorias/:id", (req, res) =>
  actualizarRegistro(
    req,
    res,
    "categorias",
    camposCategoria,
    "Error al modificar la categoria"
  )
);

app.put("/api/categorias/:id", (req, res) =>
  actualizarRegistro(
    req,
    res,
    "categorias",
    camposCategoria,
    "Error al reemplazar la categoria"
  )
);


app.listen(port, () => {
  console.log(`Backend disponible en http://localhost:${port}`);
});
