# 📖 Guía de Usuario - Wakfu Guild Manager

## ¿Qué es Wakfu Guild Manager?

Es una aplicación web para hacer seguimiento a los miembros de tu gremio en Wakfu. Registra su información y monitorea cuántas limpiezas ha realizado cada uno.

---

## Interfaz Principal

```
┌─────────────────────────────────────────────────────────┐
│                ⚔️ Gestor de Gremio Wakfu               │
│            Monitorea la actividad de tu gremio          │
└─────────────────────────────────────────────────────────┘

  📝 FORMULARIO                    📊 LISTA DE MIEMBROS
  ─────────────────                ───────────────────
  Nombre del Usuario               │ Nombre │ Personaje │...│
  Personaje Principal        →     │───────────────────────│
  Héroes                           │ Jorge │ Iop 200  │...│
  Cuenta Secundaria                │───────────────────────│
  Nombre de Ankama                 │ Maya  │ Cra 180  │...│
  Número de Limpiezas              └───────────────────────┘
  [Guardar]
```

---

## Funcionalidades

### 1️⃣ AGREGAR MIEMBRO

1. Llena el formulario de la izquierda
2. Los campos "Nombre del Usuario" y "Personaje Principal" son obligatorios
3. Los otros campos son opcionales
4. Haz click en "Guardar"
5. El miembro aparecerá inmediatamente en la lista

**Ejemplo:**
```
Nombre: Jorge
Personaje Principal: Iop
Héroes: Sacrier, Foggernaut
Cuenta Secundaria: JorgeAlt
Nombre de Ankama: JorgePlays
Limpiezas: 0
```

---

### 2️⃣ MONITOREAR LIMPIEZAS

Cada miembro tiene un contador de limpiezas:

```
┌──────────────────────────┐
│  Limpiezas: [5] [ + ]   │  ← Haz click en + para agregar
└──────────────────────────┘
```

**Cómo usar:**
1. Cuando un miembro hace una limpieza, haz click en el botón **+**
2. El número se incrementará automáticamente
3. Se guardará en la base de datos

---

### 3️⃣ EDITAR MIEMBRO

1. En la tabla, busca el miembro que quieres editar
2. Haz click en el botón **"✎ Editar"**
3. El formulario se llenará con los datos actuales
4. Cambia lo que necesites
5. Haz click en **"Actualizar"**
6. Haz click en **"Cancelar"** si cambias de idea

**Ejemplo de cambios comunes:**
- Agregar un nuevo héroe al campo de héroes
- Cambiar el nombre de la cuenta secundaria
- Corregir el nombre de Ankama

---

### 4️⃣ ELIMINAR MIEMBRO

1. En la tabla, busca el miembro que quieres eliminar
2. Haz click en **"✕ Eliminar"**
3. Se te pedirá confirmación (no se puede deshacer)
4. Confirma si estás seguro

⚠️ **CUIDADO**: Esta acción no se puede revertir

---

## Información de Cada Miembro

### Nombre del Usuario
- Tu apodo o nick en el juego
- Este es el identificador principal del miembro

### Personaje Principal
- Tu personaje main que usas más
- El que tiene más nivel

### Héroes
- Lista de héroes que manejas
- Separados por coma: "Iop, Cra, Feca"
- Útil para saber las clases disponibles del gremio

### Cuenta Secundaria
- Tu alt o personaje secundario
- Completamente opcional
- Útil para multiboxing

### Nombre de Ankama
- Tu usuario oficial de Ankama
- Puedes dejar vacío si prefieres
- Se usa para verificaciones oficiales

### Número de Limpiezas
- Contador de actividad
- Se incrementa automáticamente cuando haces click en +
- Útil para medir contribución al gremio

---

## Tips & Trucos

### 💡 Organización
- Mantén los nombres consistentes (ej: no "jorge", después "Jorge")
- Usa la lista de héroes para saber qué roles tiene el gremio

### 💡 Monitoreo
- Revisa regularmente quién tiene menos limpiezas
- Toma nota de miembros inactivos
- Usa el contador para premiar actividad

### 💡 Información
- Aprovecha los campos adicionales para notas
- Guarda el nombre de Ankama para verificaciones
- La cuenta secundaria te ayuda a hacer multiples sets

### 💡 Mantenimiento
- Elimina miembros que se hayan ido del gremio
- Actualiza información cuando cambien de personaje
- Mueve miembros activos a cargos basado en limpiezas

---

## Datos Guardados

Todos tus datos se guardan en **Supabase** (base de datos en la nube):
- ✅ Datos guardados automáticamente
- ✅ Acceso desde cualquier dispositivo
- ✅ Seguro y privado
- ✅ Sin necesidad de login (por ahora)

---

## Compartir tu Gremio

Como es una web, otros usuarios pueden visitar tu página si les pasas el link:

```
https://tu-proyecto.vercel.app
```

**Nota**: Actualmente, cualquiera puede agregar/editar datos. Para tener control total, solicita la opción de autenticación.

---

## Soluciones Rápidas

### ¿Desapareció un miembro?
- Recarga la página (F5)
- Verifica que tienes conexión a internet
- Intenta de nuevo en 10 segundos

### ¿No veo cambios?
- Espera 2-3 segundos
- Recarga la página
- Revisa la consola (F12 → Console) para errores

### ¿Se perdió mi información?
- Los datos se guardan en Supabase (nube)
- No se pierden aunque cierres la página
- Se sincronizan automáticamente

### ¿Puedo tener contraseña?
- Actualmente no
- Próxima versión tendrá login
- Por ahora comparte el link solo con miembros de confianza

---

## Contacto & Soporte

¿Problemas?
1. Recarga la página (a menudo soluciona)
2. Borra caché del navegador
3. Prueba en otro navegador
4. Crea un issue en GitHub

---

## Registro de Cambios

### v0.1.0 (Inicial)
- ✅ CRUD de miembros
- ✅ Contador de limpiezas
- ✅ Interfaz responsiva
- ✅ Base de datos en Supabase

### v0.2.0 (Próximo)
- 🔜 Autenticación de usuarios
- 🔜 Roles y permisos
- 🔜 Gráficos de actividad
- 🔜 Histórico de cambios

---

**¡Gracias por usar Wakfu Guild Manager! ⚔️**
