import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for Supabase
export interface DatabaseFlashcard {
  id: string
  user_id: string
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  example: string
  created_at: string
  updated_at: string
}

// For backwards compatibility
export type Flashcard = DatabaseFlashcard
