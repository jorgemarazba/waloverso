<script setup>
import { ref } from 'vue'
import MemberForm from './components/MemberForm.vue'
import MemberList from './components/MemberList.vue'

const isEditing = ref(false)
const editingMember = ref(null)
const memberListRef = ref(null)

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

const resetForm = () => {
  editingMember.value = null
  isEditing.value = false
}
</script>

<template>
  <div id="app" class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1>⚔️ Gestor de Gremio Wakfu</h1>
        <p class="subtitle">Monitorea la actividad de tus miembros de gremio</p>
      </div>
    </header>

    <main class="app-main">
      <div class="container">
        <MemberForm
          :editing-member="editingMember"
          :is-editing="isEditing"
          @member-saved="handleMemberSaved"
          @edit-cancelled="handleEditCancelled"
        />

        <MemberList
          ref="memberListRef"
          @edit-member="handleEditMember"
        />
      </div>
    </main>

    <footer class="app-footer">
      <p>© 2026 Gestor de Gremio Wakfu • Desarrollado con Vue 3</p>
    </footer>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #007bff;
  --secondary-color: #28a745;
  --danger-color: #dc3545;
  --light-bg: #f5f7fa;
  --dark-text: #333;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  padding: 2rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-footer {
  background: rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.app-footer p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1.5rem 1rem;
  }

  .header-content h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .app-main {
    padding: 1rem;
  }
}
</style>
