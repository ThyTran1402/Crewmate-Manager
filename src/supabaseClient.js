import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and API key
const supabaseUrl = 'https://your-project-ref.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema for crewmates table:
// CREATE TABLE crewmates (
//   id BIGSERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   speed INTEGER DEFAULT 0,
//   color TEXT DEFAULT 'Red',
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// ); 