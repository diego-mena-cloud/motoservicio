-- Ejecutar despues de crear las tablas y cargar datos_iniciales.sql:
-- psql -U usuario -d motoservicio -f pedidos_demo.sql

BEGIN;

WITH pedidos_demo (
    categoria, correo_cliente, estado, precio, descripcion, direccion_destino,
    origen_lat, origen_lng, destino_lat, destino_lng,
    duracion_min, distancia_km, direccion_origen
) AS (
    VALUES
        ('Repuestos', 'ana.lopez@example.com', 'Pendiente', 450.00, 'Pastillas de freno delanteras', 'Direccion de ejemplo 1', 19.432608, -99.133209, 19.436100, -99.140200, 18, 2.40, 'MotoServicio - Centro'),
        ('Accesorios', 'carlos.martinez@example.com', 'En Camino', 320.00, 'Espejos retrovisores universales', 'Direccion de ejemplo 2', 19.432608, -99.133209, 19.427500, -99.125700, 22, 3.10, 'MotoServicio - Centro'),
        ('Lubricantes', 'sofia.hernandez@example.com', 'Entrego', 180.00, 'Aceite para motor 4 tiempos, 1 litro', 'Direccion de ejemplo 3', 19.432608, -99.133209, 19.440200, -99.128400, 16, 2.00, 'MotoServicio - Centro'),
        ('Llantas', 'ana.lopez@example.com', 'Pendiente', 1250.00, 'Llanta trasera rodada 17', 'Direccion de ejemplo 1', 19.432608, -99.133209, 19.421800, -99.138600, 28, 4.20, 'MotoServicio - Centro'),
        ('Frenos', 'carlos.martinez@example.com', 'En Camino', 280.00, 'Balatas traseras', 'Direccion de ejemplo 2', 19.432608, -99.133209, 19.430100, -99.121900, 20, 2.80, 'MotoServicio - Centro'),
        ('Motor', 'sofia.hernandez@example.com', 'Pendiente', 890.00, 'Kit de cadena de distribucion', 'Direccion de ejemplo 3', 19.432608, -99.133209, 19.445300, -99.136500, 31, 4.90, 'MotoServicio - Centro'),
        ('Electricidad', 'ana.lopez@example.com', 'Entrego', 560.00, 'Bateria para motocicleta', 'Direccion de ejemplo 1', 19.432608, -99.133209, 19.426200, -99.146100, 25, 3.70, 'MotoServicio - Centro'),
        ('Mantenimiento', 'carlos.martinez@example.com', 'Pendiente', 350.00, 'Filtro de aire y bujia', 'Direccion de ejemplo 2', 19.432608, -99.133209, 19.438900, -99.119800, 27, 4.10, 'MotoServicio - Centro'),
        ('Repuestos', 'sofia.hernandez@example.com', 'En Camino', 210.00, 'Manija de embrague', 'Direccion de ejemplo 3', 19.432608, -99.133209, 19.419700, -99.130500, 24, 3.50, 'MotoServicio - Centro'),
        ('Accesorios', 'ana.lopez@example.com', 'Pendiente', 490.00, 'Parrilla trasera para motocicleta', 'Direccion de ejemplo 1', 19.432608, -99.133209, 19.434900, -99.148200, 26, 3.90, 'MotoServicio - Centro'),
        ('Lubricantes', 'carlos.martinez@example.com', 'Entrego', 240.00, 'Aceite sintetico para motor, 1 litro', 'Direccion de ejemplo 2', 19.432608, -99.133209, 19.447100, -99.126300, 30, 4.60, 'MotoServicio - Centro'),
        ('Llantas', 'sofia.hernandez@example.com', 'Pendiente', 980.00, 'Llanta delantera rodada 18', 'Direccion de ejemplo 3', 19.432608, -99.133209, 19.425600, -99.117400, 33, 5.20, 'MotoServicio - Centro'),
        ('Frenos', 'ana.lopez@example.com', 'En Camino', 175.00, 'Liquido de frenos DOT 4', 'Direccion de ejemplo 1', 19.432608, -99.133209, 19.442800, -99.143700, 23, 3.30, 'MotoServicio - Centro')
)
INSERT INTO pedidos (
    categoria_id, repartidor_id, cliente_id, estado_id,
    precio, descripcion, direccion_destino,
    origen_lat, origen_lng, destino_lat, destino_lng,
    duracion_min, distancia_km, direccion_origen
)
SELECT
    categorias.id,
    repartidores.id,
    clientes.id,
    estados.id,
    pedidos_demo.precio,
    pedidos_demo.descripcion,
    pedidos_demo.direccion_destino,
    pedidos_demo.origen_lat,
    pedidos_demo.origen_lng,
    pedidos_demo.destino_lat,
    pedidos_demo.destino_lng,
    pedidos_demo.duracion_min,
    pedidos_demo.distancia_km,
    pedidos_demo.direccion_origen
FROM pedidos_demo
JOIN categorias ON categorias.nombre = pedidos_demo.categoria
JOIN clientes ON clientes.correo = pedidos_demo.correo_cliente
JOIN estados ON estados.nombre = pedidos_demo.estado
CROSS JOIN repartidores
WHERE repartidores.correo = 'repartidor.demo@example.com';

COMMIT;
