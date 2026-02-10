import { ref, computed } from 'vue'

// Estado global del usuario logeado
const currentUser = ref(null)

// Limpiar localStorage al iniciar (para resetear estado anterior)
localStorage.removeItem('currentUser')

// Recuperar usuario guardado en session
function loadStoredUser() {
  const stored = localStorage.getItem('currentUser')
  if (stored) {
    currentUser.value = JSON.parse(stored)
  }
}

loadStoredUser()

export function useAuthStore() {
  const isAuthenticated = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isUser = computed(() => currentUser.value?.role === 'user')
  const userName = computed(() => currentUser.value?.username || '')
  const userId = computed(() => currentUser.value?.id || null)

  const login = (username, role) => {
    currentUser.value = {
      id: Date.now(),
      username,
      role,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  return {
    // Estado
    isAuthenticated,
    isAdmin,
    isUser,
    userName,
    userId,
    currentUser: computed(() => currentUser.value),
    
    // Métodos
    login,
    logout
  }
}
