-- Ejecutar con psql: psql -U usuario -f motoservicio.sql
-- La creacion de la base y \connect requieren psql (no pgAdmin Query Tool).
SELECT 'CREATE DATABASE motoservicio'
WHERE NOT EXISTS (
    SELECT 1
    FROM pg_database
    WHERE datname = 'motoservicio'
)
\gexec

\connect motoservicio

CREATE TABLE IF NOT EXISTS repartidores (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    apellido_paterno varchar(100) NOT NULL,
    apellido_materno varchar(100),
    telefono varchar(20),
    licencia varchar(50) NOT NULL UNIQUE,
    placa varchar(20) NOT NULL UNIQUE,
    correo varchar(254) NOT NULL UNIQUE,
    contrasena_hash text NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS clientes (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    apellido_paterno varchar(100) NOT NULL,
    apellido_materno varchar(100),
    telefono varchar(20),
    direccion text,
    correo varchar(254) UNIQUE
);

CREATE TABLE IF NOT EXISTS estados (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(100) NOT NULL UNIQUE,
    descripcion text,
    color varchar(30)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    categoria_id integer NOT NULL REFERENCES categorias(id),
    repartidor_id integer NOT NULL REFERENCES repartidores(id),
    cliente_id integer NOT NULL REFERENCES clientes(id),
    estado_id integer NOT NULL REFERENCES estados(id),
    precio numeric(10, 2) NOT NULL CHECK (precio >= 0),
    descripcion text,
    destino_lat numeric(9, 6) CHECK (destino_lat BETWEEN -90 AND 90),
    destino_lng numeric(9, 6) CHECK (destino_lng BETWEEN -180 AND 180),
    creado_en timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duracion_min integer CHECK (duracion_min >= 0),
    distancia_km numeric(10, 2) CHECK (distancia_km >= 0),
    direccion_origen text,
    direccion_destino text,
    origen_lat numeric(9, 6) CHECK (origen_lat BETWEEN -90 AND 90),
    origen_lng numeric(9, 6) CHECK (origen_lng BETWEEN -180 AND 180)
);
