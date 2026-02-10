<template>
  <div class="member-cards">
    <div v-if="filteredMembers.length === 0" class="empty-state">
      <p>😢 No hay miembros registrados. ¡Agrega el primero!</p>
    </div>

    <div v-else class="cards-grid">
      <div v-for="member in filteredMembers" :key="member.id" class="member-card">
        <div class="card-header">
          <h3>{{ member.personaje_principal }}</h3>
          <div class="card-actions">
            <button 
              v-if="isAuthenticated && isAdmin"
              @click="$emit('edit', member)" 
              class="btn-icon" 
              title="Editar"
            >
              ✎
            </button>
            <span 
              v-else 
              class="lock-icon" 
              title="Solo el administrador puede editar"
            >
              🔒
            </span>
            <button 
              v-if="isAuthenticated && isAdmin"
              @click="$emit('delete', member.id)" 
              class="btn-icon btn-delete" 
              title="Eliminar"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="card-section">
            <span class="label">
              <img src="/ankama.png" alt="Apodo Ankama" class="label-icon" />
              Apodo Ankama
            </span>
            <p class="value">{{ member.apodo_ankama }}</p>
          </div>

          <div v-if="member.personajes_secundarios && member.personajes_secundarios.length > 0" class="card-section">
            <span class="label">
              <img src="/secundarios.png" alt="Personajes secundarios" class="label-icon label-icon-secundarios" />
              Personajes Secundarios
            </span>
            <div class="secundarios-display">
              <span 
                v-for="(secundario, idx) in formatSecundarios(member.personajes_secundarios)" 
                :key="idx"
                class="secundario-tag"
              >
                {{ secundario }}
              </span>
            </div>
          </div>

          <div v-if="member.nombre_twitch" class="card-section">
            <span class="label">
              <img src="/twicht.jpg" alt="Twitch" class="label-icon" />
              Twitch
            </span>
            <p class="value">
              <a :href="`https://twitch.tv/${member.nombre_twitch}`" target="_blank">
                {{ member.nombre_twitch }}
              </a>
            </p>
          </div>

          <div v-if="member.quien_invito" class="card-section">
            <span class="label">👥 Quién te Invitó</span>
            <p class="value">{{ member.quien_invito }}</p>
          </div>

          <div v-if="member.fecha_registro" class="card-section">
            <span class="label">📅 Fecha de registro</span>
            <p class="value">
              {{ new Date(member.fecha_registro).toLocaleDateString() }}
            </p>
          </div>
        </div>

        <div class="card-footer">
          <div class="supervivencia-counter">
            <span class="label">Purga 🗡️</span>
            <div class="counter">
              <span class="count">{{ member.supervivencia_purga || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/adminStore'

const props = defineProps({
  members: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'delete', 'increment'])

const { isAdmin, isAuthenticated } = useAuthStore()

const filteredMembers = computed(() => props.members)

const formatSecundarios = (secundarios) => {
  if (Array.isArray(secundarios)) {
    return secundarios.filter(s => s && s.trim())
  }
  if (typeof secundarios === 'string' && secundarios.trim()) {
    return secundarios.split(',').map(s => s.trim()).filter(s => s)
  }
  return []
}
</script>

<style scoped>
.member-cards {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: rgba(10, 10, 30, 0.55);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  color: #e0e0ff;
  font-size: 1.1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.member-card {
  /* Blanco casi sólido con leve efecto cristal */
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border-top: 4px solid #667eea;
}

.member-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.btn-icon.btn-delete:hover {
  background: rgba(220, 53, 69, 0.8);
}

.lock-icon {
  font-size: 1.1rem;
  cursor: default;
  opacity: 0.7;
}

.card-body {
  padding: 1rem;
  flex: 1;
}

.card-section {
  margin-bottom: 0.8rem;
}

.card-section:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.3rem;
}

.value {
  color: #333;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.label-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: inline-block;
}

.label-icon-secundarios {
  width: 26px;
  height: 26px;
  margin-left: -4px; /* desplazar un poco hacia la izquierda */
}

.card-footer {
  background: rgba(255, 255, 255, 0.96);
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.supervivencia-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.count {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  min-width: 40px;
  text-align: center;
}

.btn-increment {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-increment:hover {
  background: #218838;
  transform: scale(1.1);
}

.secundarios-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.secundario-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
