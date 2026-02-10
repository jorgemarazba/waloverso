<template>
  <div class="stats-container">
    <div class="stat-card">
      <div class="stat-icon">👥</div>
      <div class="stat-content">
        <p class="stat-value">{{ totalMembers }}</p>
        <p class="stat-label">Miembros</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">⚔️</div>
      <div class="stat-content">
        <p class="stat-value">{{ totalSuperviviencia }}</p>
        <p class="stat-label">Purgas Totales</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">📊</div>
      <div class="stat-content">
        <p class="stat-value">{{ averageSuperviviencia }}</p>
        <p class="stat-label">Promedio de Purga</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">🏆</div>
      <div class="stat-content">
        <p class="stat-value">{{ topMember.personaje_principal || 'N/A' }}</p>
        <p class="stat-label">Top Surviviente</p>
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

const totalMembers = computed(() => props.members.length)

const totalSuperviviencia = computed(() => {
  return props.members.reduce((sum, member) => sum + (member.supervivencia_purga || 0), 0)
})

const averageSuperviviencia = computed(() => {
  if (totalMembers.value === 0) return 0
  return (totalSuperviviencia.value / totalMembers.value).toFixed(1)
})

const topMember = computed(() => {
  if (props.members.length === 0) return {}
  return props.members.reduce((max, member) => 
    (member.supervivencia_purga || 0) > (max.supervivencia_purga || 0) ? member : max
  )
})
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
  margin: 0;
}

.stat-label {
  font-size: 0.85rem;
  color: #999;
  margin: 0.25rem 0 0 0;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-value {
    font-size: 1.4rem;
  }
}
</style>
