import { createBrowserClient } from '@supabase/ssr'

// NEXT_PUBLIC_ vars are inlined at build time. The fallbacks ensure the browser
// client works even if the vars were not set when the build ran.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nlkatjxgltnwczbrktdm.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sa2F0anhnbHRud2N6YnJrdGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTA1NTgsImV4cCI6MjA5MTA4NjU1OH0.sqWD2qPh_6PP5ra43G4oR-dy-lp-iCmgjYv7SjXO3A4'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
