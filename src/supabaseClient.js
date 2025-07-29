import { createClient } from '@supabase/supabase-js'

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pynfbvjurvzeailaxczh.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bmZidmp1cnZ6ZWFpbGF4Y3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjMyNDQsImV4cCI6MjA2OTM5OTI0NH0.eUxN3mAk0gaDEhhq4y52EBOraP6eZTPNR17ee2CW_cw'

// Create Supabase client (will work with placeholder values for UI testing)
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema for crewmates table:
// CREATE TABLE crewmates (
//   id BIGSERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   speed INTEGER DEFAULT 0,
//   color TEXT DEFAULT 'Red',
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// ); 