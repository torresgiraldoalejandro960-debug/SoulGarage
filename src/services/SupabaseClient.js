import { createClient } from "@supabase/supabase-js";
 
const SUPABASE_URL = "https://zjzbjcdscknwuzxozwbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqemJqY2RzY2tud3V6eG96d2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzY1NTgsImV4cCI6MjA5NTkxMjU1OH0.Dwd44iX2ijyN_pKPA0HJH5MeiyNAZXlEcQAGtBlsNi4";
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);