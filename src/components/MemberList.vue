<template>
  <div class="member-list">
    <div v-if="loading" class="loading">
      🔄 Cargando miembros...
    </div>

    <div v-else-if="displayMembers.length === 0" class="empty-state">
      <p>😢 No hay miembros registrados. ¡Agrega el primero!</p>
    </div>

    <div v-else class="table-responsive">
      <table class="members-table">
        <thead>
          <tr>
            <th>Personaje Principal</th>
            <th>Apodo Ankama</th>
            <th>Secundarios / Twitch</th>
            <th>Quién Invitó</th>
            <th class="col-supervivencia">Supervivencia 🗡️</th>
            <th class="col-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in displayMembers" :key="member.id">
            <td class="cell-personaje">
              <strong>⚔️ {{ member.personaje_principal }}</strong>
            </td>
            <td class="cell-apodo">
              {{ member.apodo_ankama }}
            </td>
            <td class="cell-info">
              <div v-if="member.personajes_secundarios" class="info-item">
                <span class="label">🔄</span> {{ member.personajes_secundarios }}
              </div>
              <div v-if="member.nombre_twitch" class="info-item">
                <span class="label">🎮</span> 
                <a :href="`https://twitch.tv/${member.nombre_twitch}`" target="_blank">
                  {{ member.nombre_twitch }}
                </a>
              </div>
            </td>
            <td class="cell-invito">
              {{ member.quien_invito || '-' }}
            </td>
            <td class="cell-supervivencia">
              <div class="supervivencia-counter">
                <span class="count">{{ member.supervivencia_purga || 0 }}</span>
                <button
                  @click="handleIncrement(member.id)"
                  class="btn-increment"
                  title="Incrementar supervivencia"
                >
                  +
                </button>
              </div>
            </td>
            <td class="cell-actions">
              <button
                @click="handleEdit(member)"
                class="btn btn-sm btn-edit"
                title="Editar miembro"
              >
                ✎ Editar
              </button>
              <button
                @click="handleDelete(member.id)"
                class="btn btn-sm btn-delete"
                title="Eliminar miembro"
              >
                ✕ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="error" class="error-message">
      ❌ {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMembers, deleteMember, incrementSuperviviencia } from '../services/api'

const props = defineProps({
  members: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit-member', 'set-members'])

const internalMembers = ref([])
const loading = ref(true)
const error = ref('')

// Usar members de props si se proporciona, si no usar internalMembers
const displayMembers = computed(() => {
  return props.members.length > 0 ? props.members : internalMembers.value
})

const loadMembers = async () => {
  try {
    loading.value = true
    error.value = ''
    const members = await getMembers()
    internalMembers.value = members
    emit('set-members', members)
  } catch (err) {
    error.value = 'Error al cargar miembros: ' + err.message
  } finally {
    loading.value = false
  }
}

const handleEdit = (member) => {
  emit('edit-member', member)
}

const handleDelete = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
    try {
      await deleteMember(id)
      await loadMembers()
    } catch (err) {
      error.value = 'Error al eliminar miembro: ' + err.message
    }
  }
}

const handleIncrement = async (id) => {
  try {
    await incrementSuperviviencia(id)
    await loadMembers()
  } catch (err) {
    error.value = 'Error al actualizar supervivencia: ' + err.message
  }
}

onMounted(loadMembers)

defineExpose({
  loadMembers
})
</script>

<style scoped>
.member-list {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1.1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #999;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0;
}

.table-responsive {
  overflow-x: auto;
}

.members-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.members-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom: 2px solid #667eea;
}

.members-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.members-table tbody tr {
  border-bottom: 1px solid #eee;
  transition: all 0.3s;
}

.members-table tbody tr:hover {
  background-color: #f9f9f9;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);
}

.members-table tr:nth-child(even) {
  background-color: #fbfbfb;
}

.members-table td {
  padding: 1rem;
  vertical-align: middle;
}

.cell-nombre {
  min-width: 120px;
  font-weight: 600;
  color: #333;
}

.cell-personaje {
  min-width: 150px;
  color: #555;
}

.cell-info {
  min-width: 250px;
  font-size: 0.9rem;
}

.info-item {
  margin: 0.3rem 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-item .label {
  font-weight: 600;
  min-width: 20px;
}

.cell-limpieza {
  min-width: 100px;
}

.limpieza-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f4ff;
  padding: 0.5rem;
  border-radius: 6px;
  width: fit-content;
}

.count {
  font-weight: 700;
  font-size: 1.3rem;
  color: #667eea;
  min-width: 30px;
  text-align: center;
}

.btn-increment {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
}

.btn-increment:hover {
  background: #218838;
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.cell-actions {
  min-width: 180px;
  display: flex;
  gap: 0.5rem;
}

.btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-sm {
  padding: 0.5rem 0.8rem;
  font-size: 0.85rem;
}

.btn-edit {
  background: #007bff;
  color: white;
  flex: 1;
}

.btn-edit:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.btn-delete {
  background: #dc3545;
  color: white;
  flex: 1;
}

.btn-delete:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.error-message {
  color: #dc3545;
  padding: 1rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  margin-top: 1rem;
}

.col-limpiezas {
  text-align: center;
}

.col-actions {
  text-align: center;
}

@media (max-width: 1024px) {
  .members-table {
    font-size: 0.85rem;
  }

  .members-table th,
  .members-table td {
    padding: 0.8rem 0.5rem;
  }

  .cell-info {
    min-width: 180px;
  }

  .cell-actions {
    flex-direction: column;
    gap: 0.25rem;
  }

  .btn-sm {
    width: 100%;
    padding: 0.5rem 0.4rem;
  }
}

@media (max-width: 768px) {
  .member-list {
    padding: 1rem;
  }

  .members-table {
    font-size: 0.75rem;
  }

  .members-table th,
  .members-table td {
    padding: 0.6rem 0.3rem;
  }

  .cell-info {
    min-width: 120px;
  }

  .limpieza-counter {
    gap: 0.25rem;
  }

  .btn-increment {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }

  .count {
    font-size: 1rem;
  }
}
</style>
