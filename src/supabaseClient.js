import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tuoid.supabase.co';
const supabaseAnonKey = 'tua-chiave-anon';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
