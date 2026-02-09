-- Ejecuta esto en Supabase SQL Editor para verificar todo

-- 1. Ver si la tabla existe y tiene datos
SELECT 'Tabla guild_members:' as check_type;
SELECT COUNT(*) as total_members FROM guild_members;
SELECT * FROM guild_members LIMIT 5;

-- 2. Verificar las políticas RLS
SELECT 'Políticas RLS:' as check_type;
SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check 
FROM pg_policies 
WHERE tablename = 'guild_members';

-- 3. Verificar que RLS esté habilitado
SELECT 'RLS Status:' as check_type;
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'guild_members';

-- 4. Si NO hay datos, insertar datos de prueba
INSERT INTO guild_members (personaje_principal, apodo_ankama, personajes_secundarios, nombre_twitch, quien_invito, supervivencia_purga)
VALUES 
  ('Assa', 'assa#0001', 'Assa2, Assa3', 'assa_stream', 'Admin', 5),
  ('Iop', 'iop#0002', 'Iop2', 'iop_gamer', 'Reclutador', 3),
  ('Cra', 'cra#0003', '', '', 'Líder', 2)
ON CONFLICT DO NOTHING;

-- 5. Verificar que todo está en orden
SELECT 'Final check:' as check_type;
SELECT COUNT(*) as members_in_db FROM guild_members;
