<template>
  <div class="search-filter-container">
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar miembro..."
        class="search-input"
      />
    </div>

    <div class="filter-buttons">
      <button
        :class="{ active: viewMode === 'cards' }"
        @click="viewMode = 'cards'"
        class="btn-view"
        title="Vista de tarjetas"
      >
        📇 Tarjetas
      </button>
      <button
        :class="{ active: viewMode === 'table' }"
        @click="viewMode = 'table'"
        class="btn-view"
        title="Vista de tabla"
      >
        📊 Tabla
      </button>
    </div>

    <div class="sort-buttons">
      <button
        :class="{ active: sortBy === 'nombre' }"
        @click="sortBy = 'nombre'"
        class="btn-sort"
      >
        A-Z
      </button>
      <button
        :class="{ active: sortBy === 'limpieza' }"
        @click="sortBy = 'limpieza'"
        class="btn-sort"
      >
        🧹 Más activo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:search', 'update:viewMode', 'update:sortBy'])

const searchQuery = ref('')
const viewMode = ref('cards')
const sortBy = ref('nombre')

watch(searchQuery, (val) => {
  emit('update:search', val)
})

watch(viewMode, (val) => {
  emit('update:viewMode', val)
})

watch(sortBy, (val) => {
  emit('update:sortBy', val)
})
</script>

<style scoped>
.search-filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-buttons,
.sort-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-view,
.btn-sort {
  padding: 0.6rem 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-view:hover,
.btn-sort:hover {
  border-color: #667eea;
  color: #667eea;
}

.btn-view.active,
.btn-sort.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

@media (max-width: 768px) {
  .search-filter-container {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .filter-buttons,
  .sort-buttons {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
