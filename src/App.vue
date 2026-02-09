<script setup>
import { ref, computed } from 'vue'
import MemberForm from './components/MemberForm.vue'
import MemberList from './components/MemberList.vue'
import MemberCards from './components/MemberCards.vue'
import StatsCard from './components/StatsCard.vue'
import SearchFilter from './components/SearchFilter.vue'

const isEditing = ref(false)
const editingMember = ref(null)
const memberListRef = ref(null)
const allMembers = ref([])
const searchQuery = ref('')
const viewMode = ref('cards')
const sortBy = ref('nombre')

// Detectar si está en modo demo
const isDemoMode = computed(() => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !url || !key || url.trim() === '' || key.trim() === ''
})

// Filtrar y ordenar miembros
const filteredMembers = computed(() => {
  let filtered = allMembers.value

  // Buscar
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m =>
      m.nombre?.toLowerCase().includes(query) ||
      m.personaje_principal?.toLowerCase().includes(query) ||
      m.nombre_ankama?.toLowerCase().includes(query)
    )
  }

  // Ordenar
  if (sortBy.value === 'limpieza') {
    filtered.sort((a, b) => (b.limpieza || 0) - (a.limpieza || 0))
  } else {
    filtered.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
  }

  return filtered
})

const handleMemberSaved = () => {
  resetForm()
  memberListRef.value?.loadMembers()
}

const handleEditMember = (member) => {
  editingMember.value = member
  isEditing.value = true
}

const handleEditCancelled = () => {
  resetForm()
}

const handleDelete = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
    const { deleteMember } = await import('./services/api.js')
    try {
      await deleteMember(id)
      memberListRef.value?.loadMembers()
    } catch (err) {
      console.error('Error:', err)
    }
  }
}

const handleIncrement = async (id) => {
  const { incrementCleanup } = await import('./services/api.js')
  try {
    await incrementCleanup(id)
    memberListRef.value?.loadMembers()
  } catch (err) {
    console.error('Error:', err)
  }
}

const resetForm = () => {
  editingMember.value = null
  isEditing.value = false
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
    <header class="app-header">
      <div class="header-content">
        <h1>⚔️ Gestor de Gremio Wakfu</h1>
        <p class="subtitle">Monitorea la actividad de tus miembros de gremio</p>
        <div v-if="isDemoMode" class="demo-notice">
          ⚠️ Modo Demo (sin Supabase) - Los datos se guardan localmente
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="container">
        <!-- FORMULARIO -->
        <div class="section-form">
          <MemberForm
            :editing-member="editingMember"
            :is-editing="isEditing"
            @member-saved="handleMemberSaved"
            @edit-cancelled="handleEditCancelled"
          />
        </div>

        <!-- ESTADÍSTICAS -->
        <div class="section-stats">
          <StatsCard :members="filteredMembers" />
        </div>

        <!-- BÚSQUEDA Y FILTROS -->
        <div class="section-controls">
          <SearchFilter
            :search-query="searchQuery"
            :view-mode="viewMode"
            :sort-by="sortBy"
            @update:search="searchQuery = $event"
            @update:viewMode="viewMode = $event"
            @update:sortBy="sortBy = $event"
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

.header-content h1 {
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

.app-main {
  flex: 1;
  padding: 3rem 1rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-form {
  margin-bottom: 3rem;
}

.section-stats {
  margin-bottom: 3rem;
  animation: slideUp 0.6s ease-out;
}

.section-controls {
  margin-bottom: 2rem;
  animation: slideUp 0.6s ease-out 0.1s backwards;
}

.section-members {
  animation: slideUp 0.6s ease-out 0.2s backwards;
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

  .header-content h1 {
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

  .section-stats {
    margin-bottom: 2rem;
  }

  .section-controls {
    margin-bottom: 1.5rem;
  }
}
</style>
