// Debug helper para verificar conexión a Supabase
import { supabase } from './supabaseClient'

export async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  // Verificar que supabase está inicializado
  if (!supabase) {
    console.error('❌ Supabase client is NULL - check environment variables')
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'EXISTS (hidden)' : 'NOT SET')
    return false
  }

  try {
    // Intentar obtener un registro
    const { data, error } = await supabase
      .from('guild_members')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Supabase query error:', error)
      return false
    }

    console.log('✅ Supabase connection OK')
    console.log('Sample data:', data)
    return true
  } catch (err) {
    console.error('❌ Connection test failed:', err)
    return false
  }
}

export async function getAllGuildMembers() {
  console.log('📋 Fetching all guild members...')
  
  if (!supabase) {
    console.error('❌ Supabase not initialized')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('guild_members')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching members:', error)
      return null
    }

    console.log('✅ Found', data.length, 'members')
    console.log(data)
    return data
  } catch (err) {
    console.error('❌ Fetch failed:', err)
    return null
  }
}
