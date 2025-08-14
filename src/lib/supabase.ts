import { createClient } from '@supabase/supabase-js'

// Since this is a Lovable project with native Supabase integration,
// these environment variables should be automatically available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)