<template>
  <div class="member-form">
    <h2>{{ isEditing ? 'Editar Miembro' : 'Agregar Nuevo Miembro' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="personaje">Designa un personaje principal:</label>
        <input
          id="personaje"
          v-model="formData.personaje_principal"
          type="text"
          required
          placeholder="Ej: Assa"
        />
      </div>

      <div class="form-group">
        <label for="apodo">Apodo Ankama:</label>
        <input
          id="apodo"
          v-model="formData.apodo_ankama"
          type="text"
          required
          placeholder="Ej: kisaketi#5025"
        />
      </div>

      <div class="form-group-full">
        <div class="secundarios-header">
          <label>Personajes Secundarios:</label>
          <button 
            type="button" 
            @click="addSecundario" 
            class="btn-add-secundario"
            title="Agregar otro personaje secundario"
          >
            ➕ Agregar Secundario
          </button>
        </div>
        <div class="secundarios-list">
          <div 
            v-for="(secundario, index) in formData.personajes_secundarios" 
            :key="index"
            class="secundario-item"
          >
            <input
              v-model="formData.personajes_secundarios[index]"
              type="text"
              :placeholder="`Personaje secundario ${index + 1}`"
            />
            <button 
              v-if="formData.personajes_secundarios.length > 1"
              type="button" 
              @click="removeSecundario(index)" 
              class="btn-remove-secundario"
              title="Eliminar este personaje"
            >
              ❌
            </button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="twitch">Nombre de tu Twitch:</label>
        <input
          id="twitch"
          v-model="formData.nombre_twitch"
          type="text"
          placeholder="Tu usuario de Twitch"
        />
      </div>

      <div class="form-group">
        <label for="invito">Quien te invitó al gremio:</label>
        <input
          id="invito"
          v-model="formData.quien_invito"
          type="text"
          placeholder="Nombre del miembro que te invitó"
        />
      </div>

      <div class="form-group">
        <label for="purga">Purga:</label>
        <input
          id="purga"
          v-model.number="formData.supervivencia_purga"
          type="number"
          min="0"
          placeholder="0"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Actualizar' : 'Guardar' }}
        </button>
        <button v-if="isEditing" type="button" @click="cancelEdit" class="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </form>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { addMember, updateMember } from '../services/api'

const props = defineProps({
  editingMember: Object,
  isEditing: Boolean
})

const emit = defineEmits(['member-saved', 'edit-cancelled'])

const formData = ref({
  personaje_principal: '',
  apodo_ankama: '',
  personajes_secundarios: [''],
  nombre_twitch: '',
  quien_invito: '',
  supervivencia_purga: 0
})

const error = ref('')

const isEditing = computed(() => props.isEditing)

const addSecundario = () => {
  formData.value.personajes_secundarios.push('')
}

const removeSecundario = (index) => {
  formData.value.personajes_secundarios.splice(index, 1)
}

const updateFormData = () => {
  if (isEditing.value && props.editingMember) {
    const secundarios = props.editingMember.personajes_secundarios
    // Si es un array, usarlo; si es un string, dividirlo; si está vacío, array con un string vacío
    let secundariosArray = ['']
    if (Array.isArray(secundarios)) {
      secundariosArray = secundarios.length > 0 ? secundarios : ['']
    } else if (typeof secundarios === 'string' && secundarios.trim()) {
      secundariosArray = secundarios.split(',').map(s => s.trim())
    }
    formData.value = {
      ...props.editingMember,
      personajes_secundarios: secundariosArray
    }
  }
}

const handleSubmit = async () => {
  try {
    error.value = ''
    
    if (!formData.value.personaje_principal || !formData.value.apodo_ankama) {
      error.value = 'Por favor completa los campos requeridos (personaje y apodo)'
      return
    }

    // Filtrar personajes secundarios vacíos
    const dataToSave = {
      ...formData.value,
      personajes_secundarios: formData.value.personajes_secundarios.filter(s => s.trim())
    }

    if (isEditing.value) {
      await updateMember(props.editingMember.id, dataToSave)
    } else {
      await addMember(dataToSave)
    }

    resetForm()
    emit('member-saved')
  } catch (err) {
    error.value = 'Error: ' + err.message
  }
}

const resetForm = () => {
  formData.value = {
    personaje_principal: '',
    apodo_ankama: '',
    personajes_secundarios: [''],
    nombre_twitch: '',
    quien_invito: '',
    supervivencia_purga: 0
  }
}

const cancelEdit = () => {
  resetForm()
  emit('edit-cancelled')
}

watch(() => props.editingMember, updateFormData, { immediate: true })
</script>

<style scoped>
.member-form {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  grid-column: span 1;
}

.form-group-full {
  display: flex;
  flex-direction: column;
  grid-column: 1 / -1;
}

.secundarios-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.secundarios-header label {
  margin-bottom: 0;
  color: #555;
  font-weight: 500;
}

.btn-add-secundario {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add-secundario:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.secundarios-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.secundario-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.secundario-item input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.secundario-item input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.btn-remove-secundario {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-remove-secundario:hover {
  background: #c82333;
  transform: scale(1.05);
}

.form-group:nth-child(3),
.form-group:nth-child(5) {
  grid-column: 1 / -1;
}

label {
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.error-message {
  grid-column: 1 / -1;
  color: #dc3545;
  padding: 1rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-top: 1rem;
}
</style>
