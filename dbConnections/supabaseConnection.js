import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY);
export default supabase;
