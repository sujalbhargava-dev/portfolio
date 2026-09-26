const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = (process.env.SUPABASE_URL || 'https://placeholder.supabase.co').trim();
// Use the secret key for a Node backend, falling back to the publishable/anon key
const envKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder';
const supabaseKey = envKey.trim();

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
