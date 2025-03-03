import { createClient } from '@supabase/supabase-js';
import { SUPABASE_PASS_KEY } from '$env/static/private';

const supabaseUrl = 'https://awdedcwapvskerzuatuu.supabase.co';
const supabaseKey = SUPABASE_PASS_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
