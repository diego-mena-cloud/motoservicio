-- Ejecutar despues de crear las tablas:
-- psql -U usuario -d motoservicio -f datos_iniciales.sql

BEGIN;

INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, telefono, direccion, correo)
VALUES
    ('Ana', 'Lopez', 'Garcia', '0000000001', 'Direccion de ejemplo 1', 'ana.lopez@example.com'),
    ('Carlos', 'Martinez', 'Ruiz', '0000000002', 'Direccion de ejemplo 2', 'carlos.martinez@example.com'),
    ('Sofia', 'Hernandez', 'Diaz', '0000000003', 'Direccion de ejemplo 3', 'sofia.hernandez@example.com')
ON CONFLICT DO NOTHING;

-- Reemplaza el valor de contrasena_hash por un hash generado por la aplicacion.
INSERT INTO repartidores (
    nombre, apellido_paterno, apellido_materno, telefono,
    licencia, placa, correo, contrasena_hash
)
VALUES (
    'Luis', 'Ramirez', 'Torres', '0000000004',
    'LIC-DEMO-001', 'MOTO-DEMO-001', 'repartidor.demo@example.com',
    'wergwerhwrthwrthwrthwrthwrthwrthwrth'
)
ON CONFLICT DO NOTHING;

INSERT INTO categorias (nombre)
VALUES
    ('Repuestos'),
    ('Accesorios'),
    ('Lubricantes'),
    ('Llantas'),
    ('Frenos'),
    ('Motor'),
    ('Electricidad'),
    ('Mantenimiento')
ON CONFLICT DO NOTHING;

INSERT INTO estados (nombre, descripcion, color)
VALUES
    ('Pendiente', 'Pedido recibido y pendiente de entrega', '#F59E0B'),
    ('En Camino', 'Pedido en ruta al destino', '#3B82F6'),
    ('Entrego', 'Pedido entregado', '#22C55E')
ON CONFLICT DO NOTHING;

COMMIT;
