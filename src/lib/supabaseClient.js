import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_PASS_KEY } from '$env/static/public';

const supabaseUrl = 'https://awdedcwapvskerzuatuu.supabase.co';
const supabaseKey = PUBLIC_SUPABASE_PASS_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
