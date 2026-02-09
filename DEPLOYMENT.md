# 🚀 Guía Completa de Despliegue - Wakfu Guild Manager

## Opción 1: Despliegue en Vercel (RECOMENDADO - MÁS FÁCIL)

### Paso 1: Preparar todo en GitHub

1. Asegúrate de que tu código está en un repositorio en GitHub
2. Verifica que `.env` está en `.gitignore` (no debe subirse)
3. Haz commit y push de todo

```bash
git add .
git commit -m "Iniciar proyecto Wakfu Guild Manager"
git push origin main
```

### Paso 2: Crear cuenta en Vercel

1. Ve a https://vercel.com
2. Haz click en "Sign Up"
3. Selecciona "Continue with GitHub"
4. Autoriza Vercel para acceder a tu GitHub

### Paso 3: Crear proyecto en Vercel

1. Después de iniciar sesión, haz click en "Add New" > "Project"
2. Encuentra tu repositorio en la lista
3. Haz click en "Import"

### Paso 4: Configurar variables de entorno

1. En la página "Configure Project", secciona "Environment Variables"
2. Agrega las siguientes variables:
   - `VITE_SUPABASE_URL`: (Tu URL de Supabase)
   - `VITE_SUPABASE_ANON_KEY`: (Tu clave anon)
3. Haz click en "Deploy"

¡Listo! Tu app estará en línea en unos 2-3 minutos.

---

## Opción 2: Despliegue en Netlify

### Paso 1: Preparar GitHub

Igual que en Vercel (pasos 1-3 de arriba)

### Paso 2: Crear cuenta en Netlify

1. Ve a https://netlify.com
2. Haz click en "Sign up"
3. Selecciona "GitHub"
4. Autoriza Netlify

### Paso 3: Desplegar desde GitHub

1. Haz click en "Add new site" > "Import an existing project"
2. Selecciona GitHub
3. Elige tu repositorio

### Paso 4: Configurar build

Netlify debería auto-detectar que es un proyecto Vue/Vite:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 o superior

Haz click en "Deploy site"

### Paso 5: Configurar variables de entorno

1. Ve a "Site settings" > "Build & deploy" > "Environment"
2. Haz click en "Edit variables"
3. Agrega tus variables de Supabase
4. Redeploy el sitio

---

## Opción 3: Despliegue en Firebase Hosting (Alternativa)

### Paso 1: Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### Paso 2: Inicializar Firebase

```bash
firebase login
firebase init hosting
```

En las preguntas:
- **Project**: Crea uno nuevo en Firebase Console
- **Directory**: `dist`
- **SPA**: Sí

### Paso 3: Compilar y desplegar

```bash
npm run build
firebase deploy
```

Tu aplicación estará en: `https://tu-proyecto.web.app`

---

## Configuración de Supabase (Necesaria para todas las opciones)

### 1. Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Haz click en "Start your project"
3. Regístrate con GitHub o correo
4. Crea una nueva organización
5. Crea un nuevo proyecto:
   - Nombre: `wakfu-guild` (o el que prefieras)
   - Región: La más cercana a ti
   - Database password: Guárdalo en lugar seguro

### 2. Crear tabla en Supabase

Una vez creado el proyecto:

1. Ve a "SQL Editor"
2. Haz click en "New Query"
3. Copia y pega el siguiente SQL:

```sql
CREATE TABLE guild_members (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  personaje_principal VARCHAR(255) NOT NULL,
  heroes TEXT,
  cuenta_secundaria VARCHAR(255),
  nombre_ankama VARCHAR(255),
  limpieza INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON guild_members
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON guild_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON guild_members
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON guild_members
  FOR DELETE USING (true);
```

4. Haz click en "Run"

### 3. Obtener credenciales

1. Ve a "Settings" > "API"
2. Copia:
   - **Project URL**: Este es tu `VITE_SUPABASE_URL`
   - **anon public**: Este es tu `VITE_SUPABASE_ANON_KEY`

Guarda estos valores para usarlos en tu plataforma de hosting.

---

## Verificar que todo funciona

Una vez desplegado:

1. Abre tu sitio (ej: `https://tu-proyecto.vercel.app`)
2. Intenta agregar un miembro del gremio
3. Verifica que aparece en la lista
4. Prueba editar y eliminar

Si vemos la lista pero no podemos agregar miembros, revisa:
- Las variables de entorno están configuradas correctamente
- La tabla fue creada en Supabase
- Las políticas RLS permiten inserciones

---

## Troubleshooting

### "Error al cargar miembros"

**Causa**: Variables de entorno no configuradas o incorrectas

**Solución**:
1. Verifica que las variables están en tu plataforma de hosting
2. Asegúrate de que no hay espacios en blanco
3. Copia exactamente: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`

### "Error al agregar miembro"

**Causa**: Políticas RLS no configuradas correctamente

**Solución**:
1. Ve a Supabase > Authentication > Policies
2. Verifica que existen las 4 políticas (read, insert, update, delete)
3. Intenta de nuevo

### La tabla no existe

**Causa**: El SQL no se ejecutó correctamente

**Solución**:
1. Ve a Supabase > SQL Editor
2. Ejecuta nuevamente el SQL completo
3. Verifica en Table Editor que aparece la tabla

---

## Próximos pasos (Opcional)

Para hacer tu app más robusta:

1. **Agregar autenticación**: Implementar login con Supabase Auth
2. **Mejorar seguridad**: Usar políticas RLS más restrictivas
3. **Agregar más campos**: Nivel, clase de personaje, etc.
4. **Estadísticas**: Gráficos de actividad del gremio

---

## Soporte

Si tienes problemas:
1. Revisa los logs de tu plataforma (Vercel/Netlify)
2. Abre la consola del navegador (F12) para ver errores
3. Crea un issue en GitHub

¡Éxito! 🚀
