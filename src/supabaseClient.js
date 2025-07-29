import { createClient } from '@supabase/supabase-js'

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema for crewmates table:
// CREATE TABLE crewmates (
//   id BIGSERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   speed INTEGER DEFAULT 0,
//   color TEXT DEFAULT 'Red',
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// ); 