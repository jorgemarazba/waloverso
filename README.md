# ⚔️ Gestor de Gremio Wakfu

Una aplicación CRUD moderna para gestionar y monitorear los miembros de tu gremio en Wakfu. Construida con Vue 3 y Vite.

## 🎯 Características

- ✅ Registrar miembros con su personaje principal
- ✅ Guardar apodo Ankama (Usuario#Discriminador)
- ✅ Registrar personajes secundarios
- ✅ Guardar nombre de Twitch del miembro
- ✅ Registrar quién invitó al miembro
- ✅ Monitorizar supervivencia de purga
- ✅ Editar y eliminar miembros
- ✅ Estadísticas en tiempo real (total, promedio, top surviviente)
- ✅ Buscar y filtrar miembros
- ✅ Vistas en tarjetas y tabla
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
-- Ejecutar en Supabase SQL Editor
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

-- Habilitar RLS (Row Level Security)
ALTER TABLE guild_members ENABLE ROW LEVEL SECURITY;

-- Crear política única que permite acceso público a todo
CREATE POLICY "Allow public CRUD on guild_members" ON guild_members
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_guild_members_personaje ON guild_members(personaje_principal);
CREATE INDEX idx_guild_members_created_at ON guild_members(created_at DESC);
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

## � Guía de Uso

### Campos de Miembros

Cada miembro del gremio tiene los siguientes campos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Personaje Principal** | Tu personaje principal en Wakfu | `Assa` |
| **Apodo Ankama** | Tu usuario de Ankama con discriminador | `kisaketi#5025` |
| **Personajes Secundarios** | Tus personajes secundarios (opcional) | `Personnage1, Personnage2` |
| **Nombre Twitch** | Tu usuario de Twitch si streameas (opcional) | `nombre_twitch` |
| **Quién te Invitó** | Nombre del miembro que te invitó al gremio | `Nombre del Invitador` |
| **Supervivencia de Purga** | Contador de supervivencias en purgatorios | `5` |

### Acciones Disponibles

1. **Agregar Miembro**: Completa el formulario y haz click en "Guardar"
2. **Editar Miembro**: Haz click en ✏️ y modifica los datos
3. **Incrementar Supervivencia**: Haz click en el botón `+` en la tarjeta de supervivencia
4. **Eliminar Miembro**: Haz click en 🗑️ (se pedirá confirmación)
5. **Buscar Miembros**: Usa la barra de búsqueda para filtrar por nombre o apodo
6. **Cambiar Vista**: Alterna entre vista de tarjetas y tabla

### Estadísticas

La página principal muestra 4 estadísticas en tiempo real:

- **👥 Miembros**: Total de miembros registrados
- **⚔️ Supervivencia Total**: Suma de todas las supervivencias
- **📊 Promedio Supervivencia**: Promedio de supervivencia por miembro
- **🏆 Top Surviviente**: Miembro con más supervivencias

## �📁 Estructura del Proyecto

```
waloverso/
├── src/
│   ├── components/
│   │   ├── MemberForm.vue      # Formulario para agregar/editar miembros
│   │   ├── MemberCards.vue     # Vista en tarjetas de miembros
│   │   ├── MemberList.vue      # Vista en tabla de miembros
│   │   ├── StatsCard.vue       # Estadísticas del gremio
│   │   └── SearchFilter.vue    # Búsqueda y cambio de vista
│   ├── services/
│   │   ├── supabaseClient.js   # Configuración de Supabase
│   │   └── api.js              # Funciones CRUD con dual-mode (Supabase/localStorage)
│   ├── stores/                 # Estado de la aplicación
│   ├── assets/                 # Imágenes y assets
│   ├── App.vue                 # Componente principal
│   ├── main.js                 # Punto de entrada
│   └── style.css               # Estilos globales
├── public/                     # Archivos estáticos
├── .env                        # Variables de entorno (no subir a git)
├── .env.example               # Template de variables de entorno
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias del proyecto
├── SCHEMA_UPDATE.sql          # Script SQL para migrar la base de datos
├── README.md                  # Este archivo
├── QUICK_START.md             # Guía rápida de 5 minutos
├── USER_GUIDE.md              # Guía completa para usuarios finales
├── DEPLOYMENT.md              # Guía de despliegue en producción
└── index.html                 # Plantilla HTML
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
