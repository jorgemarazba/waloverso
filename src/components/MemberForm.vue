<template>
  <div class="member-form">
    <h2>{{ isEditing ? 'Editar Miembro' : 'Agregar Nuevo Miembro' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre del Usuario:</label>
        <input
          id="nombre"
          v-model="formData.nombre"
          type="text"
          required
          placeholder="Nombre del usuario"
        />
      </div>

      <div class="form-group">
        <label for="personaje">Personaje Principal:</label>
        <input
          id="personaje"
          v-model="formData.personaje_principal"
          type="text"
          required
          placeholder="Nombre del personaje principal"
        />
      </div>

      <div class="form-group">
        <label for="heroes">Héroes (separados por coma):</label>
        <input
          id="heroes"
          v-model="formData.heroes"
          type="text"
          placeholder="Héroe1, Héroe2, Héroe3"
        />
      </div>

      <div class="form-group">
        <label for="secundaria">Cuenta Secundaria:</label>
        <input
          id="secundaria"
          v-model="formData.cuenta_secundaria"
          type="text"
          placeholder="Nombre de la cuenta secundaria"
        />
      </div>

      <div class="form-group">
        <label for="ankama">Nombre de Ankama:</label>
        <input
          id="ankama"
          v-model="formData.nombre_ankama"
          type="text"
          placeholder="Nombre de Ankama"
        />
      </div>

      <div class="form-group">
        <label for="limpieza">Número de Limpiezas:</label>
        <input
          id="limpieza"
          v-model.number="formData.limpieza"
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
import { ref, computed } from 'vue'
import { addMember, updateMember } from '../services/api'

const props = defineProps({
  editingMember: Object,
  isEditing: Boolean
})

const emit = defineEmits(['member-saved', 'edit-cancelled'])

const formData = ref({
  nombre: '',
  personaje_principal: '',
  heroes: '',
  cuenta_secundaria: '',
  nombre_ankama: '',
  limpieza: 0
})

const error = ref('')

const isEditing = computed(() => props.isEditing)

const updateFormData = () => {
  if (isEditing.value && props.editingMember) {
    formData.value = {
      ...props.editingMember
    }
  }
}

const handleSubmit = async () => {
  try {
    error.value = ''
    
    if (!formData.value.nombre || !formData.value.personaje_principal) {
      error.value = 'Por favor completa los campos requeridos'
      return
    }

    if (isEditing.value) {
      await updateMember(props.editingMember.id, formData.value)
    } else {
      await addMember(formData.value)
    }

    resetForm()
    emit('member-saved')
  } catch (err) {
    error.value = 'Error: ' + err.message
  }
}

const resetForm = () => {
  formData.value = {
    nombre: '',
    personaje_principal: '',
    heroes: '',
    cuenta_secundaria: '',
    nombre_ankama: '',
    limpieza: 0
  }
}

const cancelEdit = () => {
  resetForm()
  emit('edit-cancelled')
}

watch(() => props.editingMember, updateFormData, { immediate: true })
</script>

<script>
import { watch } from 'vue'
export default {
  name: 'MemberForm'
}
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
