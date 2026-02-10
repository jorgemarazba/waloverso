<template>
  <div class="auth-container">
    <button 
      @click="showModal = true" 
      :class="{ 'logged-in': isAuthenticated }"
      class="auth-btn"
      aria-label="Iniciar sesión de administrador"
      title="Iniciar sesión"
    >
      <img src="/user.png" alt="" class="auth-icon" />
      <span class="auth-text">
        {{ isAuthenticated ? userName : 'Ingresar' }}
      </span>
    </button>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>🔐 Autenticación</h2>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <!-- Panel si está logeado -->
        <div v-if="isAuthenticated" class="logged-panel">
          <div class="user-info">
            <p class="username">{{ userName }}</p>
            <p class="role-badge" :class="isAdmin ? 'admin' : 'user'">
              {{ isAdmin ? '👑 Administrador' : '👤 Usuario' }}
            </p>
          </div>
          <button @click="handleLogout" class="btn btn-logout">
            Cerrar sesión
          </button>
        </div>

        <!-- Panel de login -->
        <div v-else class="login-panel">
          <!-- Form Admin -->
          <div class="login-form">
            <h3>👑 Acceso Administrador</h3>
            <input
              v-model="adminUsername"
              type="text"
              placeholder="Nombre de usuario"
              class="input-field"
              @keyup.enter="handleAdminLogin"
              autocomplete="off"
            />
            <input
              v-model="adminPassword"
              type="password"
              placeholder="Contraseña"
              class="input-field"
              @keyup.enter="handleAdminLogin"
              autocomplete="off"
            />
            <div v-if="error" class="error-message">
              ❌ {{ error }}
            </div>
            <button @click="handleAdminLogin" class="btn btn-primary">
              Ingresar como Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/adminStore'

const { isAuthenticated, isAdmin, userName, login, logout } = useAuthStore()

const showModal = ref(false)
const error = ref('')

// Admin
const adminUsername = ref('')
const adminPassword = ref('')

// Credenciales
const ADMIN_USERNAME = 'walopi'
const ADMIN_PASSWORD = 'walopi2026'

const handleAdminLogin = () => {
  error.value = ''

  if (!adminUsername.value.trim()) {
    error.value = 'Por favor ingresa el usuario'
    return
  }

  if (!adminPassword.value.trim()) {
    error.value = 'Por favor ingresa la contraseña'
    return
  }

  if (adminUsername.value === ADMIN_USERNAME && adminPassword.value === ADMIN_PASSWORD) {
    login(adminUsername.value, 'admin')
    clearForm()
    showModal.value = false
  } else {
    error.value = 'Usuario o contraseña incorrectos'
    adminPassword.value = ''
  }
}

const handleLogout = () => {
  logout()
  showModal.value = false
}

const clearForm = () => {
  adminUsername.value = ''
  adminPassword.value = ''
  error.value = ''
}

const closeModal = () => {
  showModal.value = false
  clearForm()
}
</script>

<style scoped>
.auth-container {
  position: relative;
}

.auth-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.auth-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.auth-text {
  line-height: 1;
}

.auth-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.auth-btn.logged-in {
  background: rgba(76, 175, 80, 0.3);
  border-color: #4caf50;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 420px;
  width: 90%;
  overflow: hidden;
  animation: slideUp 0.3s ease;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
}

.logged-panel {
  padding: 2rem;
  text-align: center;
}

.user-info {
  margin-bottom: 1.5rem;
}

.username {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.role-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.role-badge.admin {
  background: #fff3e0;
  color: #e65100;
}

.role-badge.user {
  background: #e3f2fd;
  color: #0d47a1;
}

.login-panel {
  padding: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form h3 {
  margin: 0 0 0.5rem 0;
  color: #667eea;
  font-size: 1rem;
}

.input-field {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  color: #d32f2f;
  padding: 0.75rem;
  background: #ffebee;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
}

.btn {
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-logout {
  width: 100%;
  background: #f44336;
  color: white;
}

.btn-logout:hover {
  background: #d32f2f;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }

  .modal-header h2 {
    font-size: 1.1rem;
  }

  .login-panel,
  .logged-panel {
    padding: 1.5rem;
  }
}
</style>
