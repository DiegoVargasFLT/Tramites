import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  // Usar las credenciales directas del proyecto
  const supabaseUrl = "https://dwhbbetyoixfvfouvobh.supabase.co";
  const supabaseAnonKey = "sb_publishable_RSFfVjctftI6g_Cpayf8kQ_DBa7fnjA";

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  
  return supabaseInstance;
};

// For backward compatibility while we refactor or for simple checks
export const isSupabaseConfigured = () => {
  return true; // Supabase está siempre configurado con credenciales directas
};

export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  const supabase = getSupabase();
  if (!supabase) return { success: false, message: 'Faltan credenciales en Secrets' };
  
  try {
    // Intenta leer perfiles con los nombres exactos de la captura
    const { error } = await supabase.from('perfiles').select('id, nombre_completo').limit(1);
    if (error) {
       console.error("Prueba de conexión fallida:", error);
       return { success: false, message: `Supabase: ${error.message}` };
    }
    return { success: true, message: 'Conexión activa y verificada' };
  } catch (err) {
    return { success: false, message: 'Error de red. Revisa el Project URL.' };
  }
};
