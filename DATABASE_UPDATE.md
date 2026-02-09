# 📋 Instrucciones para Actualizar la Base de Datos

Este documento te guía paso a paso para actualizar tu tabla en Supabase del esquema antiguo al nuevo.

## 🚨 IMPORTANTE: Lee Antes de Hacer Cambios

**Opción A**: Si tienes datos valiosos que necesitas preservar → Usa la sección "Migración de Datos"
**Opción B**: Si es una instalación nueva o puedes perder los datos → Usa "Limpia e Instala"

---

## ✨ Opción 1: Limpia e Instala (Recomendado para nuevas instalaciones)

Si no tienes datos existentes importantes, esta es la forma más rápida:

### Paso 1: Accede a Supabase
1. Ve a [app.supabase.com](https://app.supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto Wakfu

### Paso 2: Abre el SQL Editor
1. En el menú lateral izquierdo, busca "SQL Editor"
2. Haz click en "SQL Editor"
3. Haz click en "New Query"

### Paso 3: Ejecuta el SQL de Instalación

Copia y pega TODO el siguiente código en el SQL Editor:

```sql
-- Eliminar tabla antigua si existe
DROP TABLE IF EXISTS guild_members;

-- Crear tabla nueva con nuevo esquema
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

-- Habilitar RLS (Row Level Security)
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Crear política única que permite acceso público completo
CREATE POLICY "Allow public CRUD on guild_members" ON guild_members
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_guild_members_personaje ON guild_members(personaje_principal);
CREATE INDEX idx_guild_members_created_at ON guild_members(created_at DESC);
```

### Paso 4: Ejecuta la Query
1. Haz click en el botón "RUN" (en la esquina superior derecha)
2. Deberías ver el mensaje "Success" o un número de filas procesadas

### ✅ ¡Listo!
Tu tabla está actualizada. Puedes cerrar el SQL Editor y usar la app normalmente.

---

## 🔄 Opción 2: Migración de Datos (Preservar datos existentes)

Si tienes datos existentes que quieres mantener, sigue estos pasos:

### Paso 1-2: Igual a arriba (accede a Supabase y abre SQL Editor)

### Paso 3: Ejecuta el SQL de Migración

Copia y pega el siguiente código en el SQL Editor:

```sql
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
-- Esto intenta hacer coincidir los campos antiguos con los nuevos
INSERT INTO guild_members_new 
  (personaje_principal, apodo_ankama, personajes_secundarios, nombre_twitch, quien_invito, supervivencia_purga, created_at, updated_at)
SELECT 
  personaje_principal,
  nombre_ankama,
  cuenta_secundaria as personajes_secundarios,
  heroes as nombre_twitch,
  NULL::VARCHAR(255) as quien_invito,
  limpieza as supervivencia_purga,
  created_at,
  updated_at
FROM guild_members;

-- Paso 3: Eliminar tabla antigua
DROP TABLE guild_members;

-- Paso 4: Renombrar tabla nueva al nombre original
ALTER TABLE guild_members_new RENAME TO guild_members;

-- Paso 5: Habilitar RLS
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Paso 6: Crear política RLS
CREATE POLICY "Allow public CRUD on guild_members" ON guild_members
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Paso 7: Crear índices
CREATE INDEX idx_guild_members_personaje ON guild_members(personaje_principal);
CREATE INDEX idx_guild_members_created_at ON guild_members(created_at DESC);
```

### Paso 4: Ejecuta la Query
1. Haz click en "RUN"
2. Espera a que se complete (puede tardar unos segundos si tienes muchos datos)

### ⚠️ Nota Importante
- Los campos `heroes` se convertirán a `nombre_twitch` (puedes editarlos después)
- El campo `quien_invito` quedará vacío (puedes editarlo después)
- La supervivencia de purga se copiará de los valores de `limpieza`

### ✅ ¡Listo!
Tus datos han sido migrados al nuevo esquema.

---

## 🧪 Verificar que todo funcionó

### Desde Supabase:
1. Ve a la sección "Table Editor"
2. Selecciona "guild_members" del menú
3. Deberías ver la tabla con las columnas nuevas
4. Verifica que los datos se copiaron correctamente

### Desde la App:
1. Abre `http://localhost:5173` (o tu URL de producción)
2. Intenta agregar un nuevo miembro
3. Completa el formulario con:
   - Personaje Principal: `Assa`
   - Apodo Ankama: `kisaketi#5025`
   - Otros campos (opcionales)
4. Haz click en "Guardar"
5. Si el miembro aparece en la lista, ¡todo funciona! ✅

---

## 🆘 Si algo sale mal

### Error: "Table already exists"
- Significa que la tabla ya tiene datos. Usa **Opción 2 (Migración)**

### Error: "Permission denied"
- Verifica tus políticas RLS en Supabase
- Ve a "Authentication > Policies" y asegúrate de que "Allow public CRUD on guild_members" está activada

### Los datos antiguos desaparecieron
- Si usaste **Opción 1** es normal (limpieza completa)
- Si usaste **Opción 2** algo salió mal. Contacta al soporte

### La app no funciona después de actualizar
- Limpia el cache del navegador: `Ctrl + Shift + Delete`
- Recarga la página: `Ctrl + R`
- Verifica que las variables de entorno en `.env` son correctas

---

## ✅ Checklist Final

Después de actualizar, verifica:

- [ ] SQL ejecutado sin errores
- [ ] Tabla `guild_members` existe en Supabase
- [ ] Puedes ver las columnas: personaje_principal, apodo_ankama, etc.
- [ ] Puedes agregar un miembro nuevo desde la app
- [ ] El miembro aparece en la lista
- [ ] Puedes editar y eliminar miembros
- [ ] Las estadísticas se actualizan correctamente

---

**¡Si tienes problemas, abre un issue en GitHub!**
