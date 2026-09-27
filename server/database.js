const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_SECRET_KEY && !process.env.SUPABASE_KEY)) {
  console.warn("Supabase environment variables are missing.");
}

const supabaseUrl = (process.env.SUPABASE_URL || 'https://placeholder.supabase.co').trim();
const envKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder';
const supabaseKey = envKey.trim();

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  realtime: {
    // Disable realtime completely if we don't need subscriptions to avoid WebSocket dependency errors
    // Alternatively, just ensuring Node 24+ is used is enough, but this is safer for backends.
  }
});

module.exports = supabase;
