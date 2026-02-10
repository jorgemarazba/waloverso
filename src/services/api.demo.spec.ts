import { describe, it, expect, beforeEach } from 'vitest'
import * as api from './api'

// Forzar modo demo (sin Supabase)
vi.stubEnv('VITE_SUPABASE_URL', '')
vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')

describe('api demo mode (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('agrega y obtiene miembros desde localStorage', async () => {
    const nuevo = await api.addMember({
      personaje_principal: 'Test',
      apodo_ankama: 'test#0001',
      personajes_secundarios: [],
      nombre_twitch: '',
      quien_invito: '',
      supervivencia_purga: 0,
    })

    const miembros = await api.getMembers()

    // Solo aseguramos que el miembro recién creado está el primero
    expect(miembros[0].personaje_principal).toBe('Test')
    expect(nuevo.id).toBeTruthy()
  })
})

