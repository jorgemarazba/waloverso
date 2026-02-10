<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <div class="brand-icon-wrapper">
          <img src="/icono.png" alt="Waloverso" class="brand-icon" />
        </div>
        <span class="brand-text"><span class="walo">Walo</span><span class="verso">verso</span></span>
      </div>
      <ul class="nav-links">
        <li>
          <button 
            @click="$emit('navigate', 'welcome')" 
            :class="{ active: currentPage === 'welcome' }"
            class="nav-link"
          >
            Bienvenida
          </button>
        </li>
        <li>
          <button 
            @click="$emit('navigate', 'members')" 
            :class="{ active: currentPage === 'members' }"
            class="nav-link"
          >
            Calamardos
          </button>
        </li>
        <li>
          <AdminLogin />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import AdminLogin from './AdminLogin.vue'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'welcome'
  }
})

defineEmits(['navigate'])
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.brand-icon-wrapper {
  height: 56px;
  width: 56px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: conic-gradient(#7209b7 0 180deg, #ffffff 180deg 360deg);
  /* Octágono (8 lados) */
  clip-path: polygon(
    30% 0%,
    70% 0%,
    100% 30%,
    100% 70%,
    70% 100%,
    30% 100%,
    0% 70%,
    0% 30%
  );
}

.brand-icon {
  height: 96%;
  width: 96%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  /* mismo octágono, un poco más pequeño para dejar borde alrededor */
  clip-path: polygon(
    36% 8%,
    64% 8%,
    92% 36%,
    92% 64%,
    64% 92%,
    36% 92%,
    8% 64%,
    8% 36%
  );
}

.brand-text {
  display: flex;
  align-items: center;
}

.walo {
  color: white;
  font-weight: 700;
}

.verso {
  color: #7209b7;
  font-weight: 700;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.3);
  border-bottom: 3px solid #fff;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
