# ⚔️ Gestor de Gremio Wakfu

Una aplicación CRUD moderna para gestionar y monitorear los miembros de tu gremio en Wakfu. Construida con Vue 3 y Vite.

## 🎯 Características

- ✅ Agregar nuevos miembros del gremio
- ✅ Editar información de miembros existentes
- ✅ Eliminar miembros del gremio
- ✅ Monitorizar número de limpiezas realizadas
- ✅ Registrar información de un personaje principal y secundario
- ✅ Guardar datos de Héroes y nombre de Ankama
- ✅ Interfaz moderna y responsiva
- ✅ Base de datos en la nube (Supabase)

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Cuenta gratuita en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) o [Netlify](https://netlify.com) (para hosting)

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd waloverso
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

#### a) Crear una cuenta en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Regístrate o inicia sesión
3. Crea un nuevo proyecto

#### b) Crear la tabla `guild_members`

Una vez en tu proyecto de Supabase:

1. Ve a la sección "SQL Editor"
2. Crea una nueva consulta y ejecuta:

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

-- Habilitar RLS (Row Level Security)
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Crear política pública para SELECT
CREATE POLICY "Allow public read" ON guild_members
  FOR SELECT USING (true);

-- Crear política pública para INSERT
CREATE POLICY "Allow public insert" ON guild_members
  FOR INSERT WITH CHECK (true);

-- Crear política pública para UPDATE
CREATE POLICY "Allow public update" ON guild_members
  FOR UPDATE USING (true);

-- Crear política pública para DELETE
CREATE POLICY "Allow public delete" ON guild_members
  FOR DELETE USING (true);
```

#### c) Obtener las credenciales

1. Ve a "Settings > API" en tu proyecto de Supabase
2. Copia tu `Project URL` y `anon public key`
3. Abre el archivo `.env` en la raíz del proyecto
4. Reemplaza los valores:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 🌐 Desplegar en Producción (Gratuito)

### Opción 1: Vercel (Recomendado)

1. **Crear cuenta en Vercel**
   - Ve a [https://vercel.com](https://vercel.com)
   - Registrate con GitHub

2. **Conectar tu repositorio**
   - Haz click en "New Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configurar variables de entorno**
   - En la sección "Environment Variables", agrega:
     - `VITE_SUPABASE_URL`: Tu URL de Supabase
     - `VITE_SUPABASE_ANON_KEY`: Tu clave anon de Supabase

4. **Desplegar**
   - Vercel desplegará automáticamente

Tu aplicación estará en: `https://tu-proyecto.vercel.app`

### Opción 2: Netlify

1. **Crear cuenta en Netlify**
   - Ve a [https://netlify.com](https://netlify.com)
   - Registrate con GitHub

2. **Conectar tu repositorio**
   - Haz click en "Add new site > Import an existing project"
   - Selecciona GitHub y tu repositorio

3. **Configurar build**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Configurar variables de entorno**
   - En "Site settings > Build & deploy > Environment"
   - Agrega tus variables de Supabase

5. **Desplegar**
   - Netlify desplegará automáticamente

Tu aplicación estará en: `https://tu-proyecto.netlify.app`

## 📁 Estructura del Proyecto

```
waloverso/
├── src/
│   ├── components/
│   │   ├── MemberForm.vue      # Formulario para agregar/editar miembros
│   │   └── MemberList.vue      # Lista de miembros del gremio
│   ├── services/
│   │   ├── supabaseClient.js   # Configuración de Supabase
│   │   └── api.js              # Funciones para interactuar con la BD
│   ├── App.vue                 # Componente principal
│   ├── main.js                 # Punto de entrada
│   └── style.css               # Estilos globales
├── public/                     # Archivos estáticos
├── .env                        # Variables de entorno (no subir a git)
├── .env.example               # Template de variables de entorno
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```

## 🔐 Seguridad

**IMPORTANTE**: Nunca subas tu archivo `.env` a GitHub. Ya está incluido en `.gitignore`.

La configuración actual usa políticas RLS públicas en Supabase. Para una aplicación en producción con datos sensibles, considera:
- Implementar autenticación de usuarios
- Usar políticas RLS más restrictivas
- Validar datos en el servidor

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 📧 Soporte

¿Necesitas ayuda? Abre un issue en GitHub o contacta directamente.

---

**¡Hecho con ❤️ para la comunidad Wakfu!**
