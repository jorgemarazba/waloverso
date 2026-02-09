import { createClient } from '@supabase/supabase-js'

// Reemplaza estas variables con tus credenciales de Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Solo crear cliente si tenemos credenciales válidas
let supabase = null

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
}

export { supabase }

