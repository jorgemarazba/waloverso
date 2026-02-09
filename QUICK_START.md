# ⚡ Inicio Rápido - Wakfu Guild Manager

## 5 minutos para tener tu app funcionando

### Paso 1: Clonar y configurar (2 min)

```bash
# Actualizar archivos
cd waloverso
npm install
```

### Paso 2: Configurar Supabase (2 min)

1. Ve a https://supabase.com y crea una cuenta gratuita
2. Crea un nuevo proyecto (toma ~2 min)
3. En "Settings > API", copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
4. Abre `.env` y pega:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Paso 3: Crear tabla en Supabase (1 min)

1. En tu proyecto, ve a "SQL Editor"
2. Copia este SQL del archivo `DEPLOYMENT.md` sección "Crear tabla en Supabase"
3. Pega y ejecuta

### Paso 4: Ejecutar localmente

```bash
npm run dev
```

¡Abre http://localhost:5173 en tu navegador!

---

## Tutorial: Agregar tu primer miembro

1. Completa el formulario en el lado izquierdo
2. Haz click en "Guardar"
3. ¡Verás el miembro aparecer en la tabla!

### Campos del formulario:
- **Nombre del Usuario**: Tu nick en el juego
- **Personaje Principal**: Tu personaje main
- **Héroes** (opcional): Heroes que manejas (ej: Iop, Cra, Feca)
- **Cuenta Secundaria** (opcional): Tu alt
- **Nombre de Ankama** (opcional): Tu usuario oficial
- **Limpiezas**: Inicia en 0, haz click en + para incrementar

---

## Desplegar a producción (1 minuto extra)

Ver `DEPLOYMENT.md` para:
- Vercel (RECOMENDADO)
- Netlify
- Firebase

---

## Ayuda rápida

| Problema | Solución |
|----------|----------|
| "Error al cargar miembros" | Revisa `.env` tiene valores de Supabase |
| Tabla "guild_members" no existe | Ejecuta el SQL en Supabase SQL Editor |
| No puedo agregar miembros | Verifica las políticas RLS en Supabase |
| App no muestra en produce | Agrega variables de entorno en tu proveedor |

---

## Archivos importantes

- **`.env`**: Tu configuración (NO subas a GitHub!)
- **`src/components/MemberForm.vue`**: Formulario
- **`src/components/MemberList.vue`**: Tabla de miembros
- **`src/services/api.js`**: Conexión a base de datos
- **`README.md`**: Documentación completa
- **`DEPLOYMENT.md`**: Guía de despliegue

---

¿Listo? Abre tu terminal y corre `npm run dev` 🚀
