import { createClient } from '@supabase/supabase-js';

// Create a single supabase client instance, using the URL and key from .env file
const supabase = createClient(
  "https://dwhbbetyoixfvfouvobh.supabase.co",
  "sb_publishable_RSFfVjctftI6g_Cpayf8kQ_DBa7fnjA"
);

export default supabase;