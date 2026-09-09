import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uijmkpgdjnpfladtlsfd.supabase.co";
const supabaseAnonKey = "sb_publishable_FPbhSFZ4cGJ2EYRKiCL9vQ_ccD584P-";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
