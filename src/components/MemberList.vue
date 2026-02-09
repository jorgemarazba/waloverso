<template>
  <div class="member-list">
    <h2>Miembros del Gremio</h2>

    <div v-if="loading" class="loading">
      Cargando miembros...
    </div>

    <div v-else-if="members.length === 0" class="empty-state">
      <p>No hay miembros registrados. ¡Agrega el primero!</p>
    </div>

    <div v-else class="table-responsive">
      <table class="members-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Personaje Principal</th>
            <th>Información de Ankama</th>
            <th>Limpiezas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td class="cell-nombre">
              <strong>{{ member.nombre }}</strong>
            </td>
            <td class="cell-personaje">
              {{ member.personaje_principal }}
            </td>
            <td class="cell-info">
              <div v-if="member.nombre_ankama" class="info-item">
                <span class="label">Ankama:</span> {{ member.nombre_ankama }}
              </div>
              <div v-if="member.cuenta_secundaria" class="info-item">
                <span class="label">Secundaria:</span> {{ member.cuenta_secundaria }}
              </div>
              <div v-if="member.heroes" class="info-item">
                <span class="label">Héroes:</span> {{ member.heroes }}
              </div>
            </td>
            <td class="cell-limpieza">
              <div class="limpieza-counter">
                <span class="count">{{ member.limpieza || 0 }}</span>
                <button
                  @click="handleIncrementCleanup(member.id)"
                  class="btn-increment"
                  title="Incrementar limpieza"
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
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMembers, deleteMember, incrementCleanup } from '../services/api'

const emit = defineEmits(['edit-member'])

const members = ref([])
const loading = ref(true)
const error = ref('')

const loadMembers = async () => {
  try {
    loading.value = true
    error.value = ''
    members.value = await getMembers()
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

const handleIncrementCleanup = async (id) => {
  try {
    await incrementCleanup(id)
    await loadMembers()
  } catch (err) {
    error.value = 'Error al actualizar limpieza: ' + err.message
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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #28a745;
  padding-bottom: 0.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
  background: #f5f5f5;
  border-radius: 4px;
  margin: 1rem 0;
}

.empty-state p {
  margin: 0;
  font-size: 1.1rem;
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
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.members-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
}

.members-table tbody tr {
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s;
}

.members-table tbody tr:hover {
  background-color: #f5f5f5;
}

.members-table td {
  padding: 1rem;
  vertical-align: middle;
}

.cell-nombre {
  min-width: 120px;
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
  margin: 0.25rem 0;
  color: #666;
}

.info-item .label {
  font-weight: 600;
  color: #333;
}

.cell-limpieza {
  min-width: 100px;
}

.limpieza-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.count {
  font-weight: 700;
  font-size: 1.2rem;
  color: #007bff;
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
}

.btn-increment:hover {
  background: #218838;
  transform: scale(1.1);
}

.cell-actions {
  min-width: 200px;
  display: flex;
  gap: 0.5rem;
}

.btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}

.btn-edit {
  background: #007bff;
  color: white;
}

.btn-edit:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
}

.error-message {
  color: #dc3545;
  padding: 1rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .members-table {
    font-size: 0.85rem;
  }

  .members-table th,
  .members-table td {
    padding: 0.75rem 0.5rem;
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
    padding: 0.5rem 0.5rem;
  }
}
</style>
