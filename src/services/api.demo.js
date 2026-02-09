// API DEMO - Usa localStorage en lugar de Supabase
// Perfecto para desarrollo local sin credenciales

const TABLE_NAME = 'demo_guild_members'

// Obtener datos del localStorage
function getStoredMembers() {
  const data = localStorage.getItem(TABLE_NAME)
  return data ? JSON.parse(data) : []
}

// Guardar en localStorage
function saveMembers(members) {
  localStorage.setItem(TABLE_NAME, JSON.stringify(members))
}

// Obtener todos los miembros
export async function getMembers() {
  try {
    const data = getStoredMembers()
    return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } catch (error) {
    console.error('Error al obtener miembros demo:', error.message)
    throw error
  }
}

// Agregar nuevo miembro
export async function addMember(member) {
  try {
    const members = getStoredMembers()
    const newMember = {
      id: Date.now(), // ID simple basado en timestamp
      ...member,
      limpieza: member.limpieza || 0,
      created_at: new Date().toISOString()
    }
    members.push(newMember)
    saveMembers(members)
    return newMember
  } catch (error) {
    console.error('Error al agregar miembro demo:', error.message)
    throw error
  }
}

// Actualizar miembro
export async function updateMember(id, member) {
  try {
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
  } catch (error) {
    console.error('Error al actualizar miembro demo:', error.message)
    throw error
  }
}

// Eliminar miembro
export async function deleteMember(id) {
  try {
    let members = getStoredMembers()
    members = members.filter(m => m.id !== id)
    saveMembers(members)
  } catch (error) {
    console.error('Error al eliminar miembro demo:', error.message)
    throw error
  }
}

// Incrementar contador de limpieza
export async function incrementCleanup(id) {
  try {
    const members = getStoredMembers()
    const member = members.find(m => m.id === id)
    if (!member) throw new Error('Miembro no encontrado')
    
    member.limpieza = (member.limpieza || 0) + 1
    saveMembers(members)
    return member
  } catch (error) {
    console.error('Error al incrementar limpieza demo:', error.message)
    throw error
  }
}
