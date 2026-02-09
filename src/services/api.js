import { supabase } from './supabaseClient'

const TABLE_NAME = 'guild_members'

// Obtener todos los miembros
export async function getMembers() {
  try {
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
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{
        nombre: member.nombre,
        personaje_principal: member.personaje_principal,
        heroes: member.heroes || '',
        cuenta_secundaria: member.cuenta_secundaria || '',
        nombre_ankama: member.nombre_ankama || '',
        limpieza: member.limpieza || 0
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
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        nombre: member.nombre,
        personaje_principal: member.personaje_principal,
        heroes: member.heroes || '',
        cuenta_secundaria: member.cuenta_secundaria || '',
        nombre_ankama: member.nombre_ankama || '',
        limpieza: member.limpieza || 0
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

// Incrementar contador de limpieza
export async function incrementCleanup(id) {
  try {
    // Primero obtenemos el valor actual
    const { data: member, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('limpieza')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    const newLimpieza = (member.limpieza || 0) + 1

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ limpieza: newLimpieza })
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error al incrementar limpieza:', error.message)
    throw error
  }
}
