<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Welcome from './components/Welcome.vue'
import MemberForm from './components/MemberForm.vue'
import MemberList from './components/MemberList.vue'
import MemberCards from './components/MemberCards.vue'
// (Botón "Test Supabase" removido)

const isEditing = ref(false)
const editingMember = ref(null)
const memberListRef = ref(null)
const allMembers = ref([])
const viewMode = ref('cards')
// Debug UI removida (Test Supabase)
const showForm = ref(false)
const currentPage = ref('welcome')
const searchQuery = ref('')

// Detectar si está en modo demo (controlado solo por VITE_DEMO_MODE)
// Si no está activa la flag, se asume modo normal con Supabase
const isDemoMode = computed(() => import.meta.env.VITE_DEMO_MODE === 'true')

// Filtrar miembros por búsqueda
const filteredMembers = computed(() => {
  if (!searchQuery.value.trim()) {
    return allMembers.value
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return allMembers.value.filter(member => {
    const principal = (member.personaje_principal || '').toLowerCase()
    const apodo = (member.apodo_ankama || '').toLowerCase()
    const twitch = (member.nombre_twitch || '').toLowerCase()
    const invito = (member.quien_invito || '').toLowerCase()
    
    return principal.includes(query) || apodo.includes(query) || twitch.includes(query) || invito.includes(query)
  })
})

const loadMembers = async () => {
  try {
    const { getMembers } = await import('./services/api.js')
    const members = await getMembers()
    allMembers.value = members
  } catch (err) {
    console.error('Error loading members:', err)
  }
}

const handleMemberSaved = () => {
  resetForm()
  showForm.value = false
  loadMembers()
}

const handleEditMember = (member) => {
  editingMember.value = member
  isEditing.value = true
  showForm.value = true
}

const handleEditCancelled = () => {
  resetForm()
  showForm.value = false
}

const handleDelete = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
    const { deleteMember } = await import('./services/api.js')
    try {
      await deleteMember(id)
      loadMembers()
    } catch (err) {
      console.error('Error:', err)
    }
  }
}

const handleIncrement = async (id) => {
  const { incrementSuperviviencia } = await import('./services/api.js')
  try {
    await incrementSuperviviencia(id)
    loadMembers()
  } catch (err) {
    console.error('Error:', err)
  }
}

const resetForm = () => {
  editingMember.value = null
  isEditing.value = false
}

// Cargar miembros cuando la página se carga
onMounted(() => {
  loadMembers()
})

const handleNavigate = (page) => {
  currentPage.value = page
  showForm.value = false
}

// Exponer allMembers para que MemberList pueda actualizarlo
defineExpose({
  setMembers: (members) => {
    allMembers.value = members
  }
})
</script>

<template>
  <div id="app" class="app-container">
    <!-- NAVBAR CON NAVEGACIÓN -->
    <Navbar :current-page="currentPage" @navigate="handleNavigate" />

    <!-- PÁGINA DE BIENVENIDA -->
    <Welcome v-if="currentPage === 'welcome'" />

    <!-- PÁGINA DE CALAMARDOS (MIEMBROS) -->
    <template v-else>
      <header class="app-header">
        <h1>Registro de Calamardos</h1>
        <p class="subtitle">Registrate a la brevedad intrisicamente hablando</p>
        <div class="header-content">
          <div v-if="isDemoMode" class="demo-notice">
            ⚠️ Modo Demo (sin Supabase) - Los datos se guardan localmente
          </div>
        </div>
      </header>

      <main class="app-main">
        <div class="container">
          <!-- BOTÓN PARA ABRIR FORMULARIO Y BUSCADOR -->
          <div class="section-controls">
            <button v-if="!showForm" @click="showForm = true" class="btn-new-calamardo">
              ➕ Nuevo Calamardo
            </button>
            <div class="search-box">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="🔍 Buscar por nombre, apodo, twitch o invitador..."
                class="search-input"
              />
              <span v-if="searchQuery" class="search-count">
                {{ filteredMembers.length }} encontrado(s)
              </span>
            </div>
          </div>

          <!-- FORMULARIO (OCULTO POR DEFECTO) -->
          <div v-if="showForm" class="section-form">
            <MemberForm
              :editing-member="editingMember"
              :is-editing="isEditing"
              :members="allMembers"
              @member-saved="handleMemberSaved"
              @edit-cancelled="handleEditCancelled"
            />
          </div>

          <!-- VISTA DE TARJETAS -->
          <div v-if="viewMode === 'cards'" class="section-members">
            <MemberCards
              :members="filteredMembers"
              @edit="handleEditMember"
              @delete="handleDelete"
              @increment="handleIncrement"
            />
          </div>

          <!-- VISTA DE TABLA -->
          <div v-else class="section-members">
            <MemberList
              ref="memberListRef"
              :members="filteredMembers"
              @edit-member="handleEditMember"
              @set-members="setMembers"
            />
          </div>
        </div>
      </main>
    </template>

    <footer class="app-footer">
      <p>© 2026 Gestor de Gremio Wakfu • Desarrollado con Vue 3 + Supabase</p>
    </footer>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #28a745;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Fondo SOLO en la sección de "calamardos" */
.app-main {
  position: relative;
  background-image: url('/waloverso.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Overlay leve para legibilidad sin tapar el fondo */
.app-main::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

/* Asegura que el contenido quede encima del overlay */
.app-main > .container {
  position: relative;
  z-index: 1;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.app-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.header-content {
  position: relative;
  z-index: 1;
}

.app-header > h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 800;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.95;
  margin-bottom: 1rem;
}

.demo-notice {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 193, 7, 0.15);
  border: 2px solid rgba(255, 193, 7, 0.5);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  display: inline-block;
}

.btn-test {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-left: 1rem;
  transition: all 0.3s ease;
}

.btn-test:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: white;
}

.debug-message {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
}

.debug-message.error {
  background: rgba(244, 67, 54, 0.2);
  border-color: rgba(244, 67, 54, 0.5);
}

.app-main {
  flex: 1;
  padding: 3rem 1rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: slideUp 0.6s ease-out;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1.2rem;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: #764ba2;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.search-count {
  padding: 0.5rem 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.btn-new-calamardo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-new-calamardo:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-new-calamardo:active {
  transform: translateY(-2px);
}

.section-form {
  margin-bottom: 3rem;
  animation: slideUp 0.6s ease-out;
}

.section-members {
  animation: slideUp 0.6s ease-out 0.1s backwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-footer {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  color: white;
  text-align: center;
  padding: 2rem 1rem;
  border-top: 4px solid #667eea;
  backdrop-filter: blur(10px);
}

.app-footer p {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .app-header {
    padding: 2rem 1rem;
  }

  .app-header > h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .demo-notice {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .app-main {
    padding: 1.5rem 1rem;
  }

  .section-form {
    margin-bottom: 2rem;
  }
}
</style>
