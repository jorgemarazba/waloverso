import { supabase } from './supabaseClient'

const TABLE_NAME = 'guild_members'

// Detectar si estamos en modo demo (sin credenciales de Supabase)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const IS_DEMO_MODE = !SUPABASE_URL || !SUPABASE_KEY

// ==================== FUNCIONES DEMO (localStorage) ====================
function getStoredMembers() {
  const data = localStorage.getItem(TABLE_NAME)
  return data ? JSON.parse(data) : []
}

function saveMembers(members) {
  localStorage.setItem(TABLE_NAME, JSON.stringify(members))
}

// ==================== FUNCIONES PRINCIPALES ====================

// Obtener todos los miembros
export async function getMembers() {
  try {
    if (IS_DEMO_MODE) {
      // Modo demo: usar localStorage
      const data = getStoredMembers()
      return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    // Modo producción: usar Supabase
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error al obtener miembros:', error.message)
    throw error
  }
}

// Agregar nuevo miembro
export async function addMember(member) {
  try {
    if (IS_DEMO_MODE) {
      // Modo demo
      const members = getStoredMembers()
      const newMember = {
        id: Date.now(),
        ...member,
        supervivencia_purga: member.supervivencia_purga || 0,
        created_at: new Date().toISOString()
      }
      members.push(newMember)
      saveMembers(members)
      return newMember
    }

    // Modo producción
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{
        personaje_principal: member.personaje_principal,
        apodo_ankama: member.apodo_ankama || '',
        personajes_secundarios: member.personajes_secundarios || '',
        nombre_twitch: member.nombre_twitch || '',
        quien_invito: member.quien_invito || '',
        supervivencia_purga: member.supervivencia_purga || 0
      }])
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error al agregar miembro:', error.message)
    throw error
  }
}

// Actualizar miembro
export async function updateMember(id, member) {
  try {
    if (IS_DEMO_MODE) {
      // Modo demo
      const members = getStoredMembers()
      const index = members.findIndex(m => m.id === id)
      if (index === -1) throw new Error('Miembro no encontrado')
      
      members[index] = {
        ...members[index],
        ...member,
        updated_at: new Date().toISOString()
      }
      saveMembers(members)
      return members[index]
    }

    // Modo producción
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        personaje_principal: member.personaje_principal,
        apodo_ankama: member.apodo_ankama || '',
        personajes_secundarios: member.personajes_secundarios || '',
        nombre_twitch: member.nombre_twitch || '',
        quien_invito: member.quien_invito || '',
        supervivencia_purga: member.supervivencia_purga || 0
      })
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error al actualizar miembro:', error.message)
    throw error
  }
}

// Eliminar miembro
export async function deleteMember(id) {
  try {
    if (IS_DEMO_MODE) {
      // Modo demo
      let members = getStoredMembers()
      members = members.filter(m => m.id !== id)
      saveMembers(members)
      return
    }

    // Modo producción
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error al eliminar miembro:', error.message)
    throw error
  }
}

// Incrementar contador de supervivencia de purga
export async function incrementSuperviviencia(id) {
  try {
    if (IS_DEMO_MODE) {
      // Modo demo
      const members = getStoredMembers()
      const member = members.find(m => m.id === id)
      if (!member) throw new Error('Miembro no encontrado')
      
      member.supervivencia_purga = (member.supervivencia_purga || 0) + 1
      saveMembers(members)
      return member
    }

    // Modo producción
    // Obtener el miembro actual
    const { data: currentData, error: selectError } = await supabase
      .from(TABLE_NAME)
      .select('supervivencia_purga')
      .eq('id', id)
      .single()

    if (selectError) throw selectError
    if (!currentData) throw new Error('Miembro no encontrado')

    const newSuperviviencia = (currentData.supervivencia_purga || 0) + 1

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ supervivencia_purga: newSuperviviencia })
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error al incrementar supervivencia:', error.message)
    throw error
  }
}

