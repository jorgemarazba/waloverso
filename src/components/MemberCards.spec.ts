import { mount } from '@vue/test-utils'
import MemberCards from './MemberCards.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../stores/adminStore', () => ({
  useAuthStore: () => ({
    isAdmin: { value: true },
    isAuthenticated: { value: true },
  }),
}))

// Mock simple para evitar errores al cargar imágenes estáticas
vi.stubGlobal('Image', class MockImage {})

const mockMembers = [
  {
    id: 1,
    personaje_principal: 'Trisk',
    apodo_ankama: 'drakgamer#2719',
    personajes_secundarios: ['A', 'B'],
    nombre_twitch: 'drak',
    quien_invito: 'walopi',
    supervivencia_purga: 3,
  },
]

describe('MemberCards', () => {
  it('muestra la información básica del miembro', () => {
    const wrapper = mount(MemberCards, {
      props: { members: mockMembers },
    })

    expect(wrapper.text()).toContain('Trisk')
    expect(wrapper.text()).toContain('drakgamer#2719')
    expect(wrapper.text()).toContain('Purga')
    expect(wrapper.text()).toContain('3')
  })

  it('emite evento edit al hacer click en el botón editar', async () => {
    const wrapper = mount(MemberCards, {
      props: { members: mockMembers },
    })

    await wrapper.find('button.btn-icon').trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]?.[0].id).toBe(1)
  })
})

