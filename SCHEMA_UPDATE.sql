-- Ejecuta este SQL en el Supabase SQL Editor para actualizar la tabla con los nuevos campos
-- URL: https://app.supabase.com/project/PROJECT_ID/sql/new

-- Opción 1: Si quieres mantener los datos existentes (migración)
-- DESCOMENTA SOLO SI TIENES DATOS VALIOSOS QUE PRESERVAR

/*
-- Paso 1: Crear tabla nueva con nuevo esquema
CREATE TABLE guild_members_new (
  id BIGSERIAL PRIMARY KEY,
  personaje_principal VARCHAR(255) NOT NULL,
  apodo_ankama VARCHAR(255) NOT NULL,
  personajes_secundarios TEXT,
  nombre_twitch VARCHAR(255),
  quien_invito VARCHAR(255),
  supervivencia_purga INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Paso 2: Copiar datos existentes (mapear campos viejos a nuevos)
INSERT INTO guild_members_new (personaje_principal, apodo_ankama, personajes_secundarios, nombre_twitch, quien_invito, supervivencia_purga, created_at, updated_at)
SELECT 
  personaje_principal,
  nombre_ankama,
  cuenta_secundaria,
  heroes,
  NULL::VARCHAR(255),
  limpieza,
  created_at,
  updated_at
FROM guild_members;

-- Paso 3: Eliminar tabla antigua
DROP TABLE guild_members;

-- Paso 4: Renombrar tabla nueva
ALTER TABLE guild_members_new RENAME TO guild_members;

-- Paso 5: Habilitar RLS
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Paso 6: Crear políticas RLS
CREATE POLICY "Allow public CRUD on guild_members" ON guild_members
  FOR ALL
  USING (true)
  WITH CHECK (true);
*/

-- Opción 2: Si prefieres empezar limpio (recomendado)
-- DESCOMENTAR PARA USAR

DROP TABLE IF EXISTS guild_members;

CREATE TABLE guild_members (
  id BIGSERIAL PRIMARY KEY,
  personaje_principal VARCHAR(255) NOT NULL,
  apodo_ankama VARCHAR(255) NOT NULL,
  personajes_secundarios TEXT,
  nombre_twitch VARCHAR(255),
  quien_invito VARCHAR(255),
  supervivencia_purga INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Crear política RLS para permitir acceso público
CREATE POLICY "Allow public CRUD on guild_members" ON guild_members
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Crear índice para mejor rendimiento en búsquedas
CREATE INDEX idx_guild_members_personaje ON guild_members(personaje_principal);
CREATE INDEX idx_guild_members_created_at ON guild_members(created_at DESC);
