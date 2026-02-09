<template>
  <div class="member-cards">
    <div v-if="filteredMembers.length === 0" class="empty-state">
      <p>😢 No hay miembros que coincidan con tu búsqueda</p>
    </div>

    <div v-else class="cards-grid">
      <div v-for="member in filteredMembers" :key="member.id" class="member-card">
        <div class="card-header">
          <h3>{{ member.personaje_principal }}</h3>
          <div class="card-actions">
            <button @click="$emit('edit', member)" class="btn-icon" title="Editar">
              ✎
            </button>
            <button @click="$emit('delete', member.id)" class="btn-icon btn-delete" title="Eliminar">
              ✕
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="card-section">
            <span class="label">📛 Apodo Ankama</span>
            <p class="value">{{ member.apodo_ankama }}</p>
          </div>

          <div v-if="member.personajes_secundarios" class="card-section">
            <span class="label">🔄 Personajes Secundarios</span>
            <p class="value">{{ member.personajes_secundarios }}</p>
          </div>

          <div v-if="member.nombre_twitch" class="card-section">
            <span class="label">🎮 Twitch</span>
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
        </div>

        <div class="card-footer">
          <div class="supervivencia-counter">
            <span class="label">Supervivencia 🗡️</span>
            <div class="counter">
              <span class="count">{{ member.supervivencia_purga || 0 }}</span>
              <button @click="$emit('increment', member.id)" class="btn-increment">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  members: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'delete', 'increment'])

const filteredMembers = computed(() => props.members)
</script>

<style scoped>
.member-cards {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f5f5f5;
  border-radius: 8px;
  color: #999;
  font-size: 1.1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.member-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.3rem;
}

.value {
  color: #333;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.card-footer {
  background: #f9f9f9;
  padding: 1rem;
  border-top: 1px solid #eee;
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

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
