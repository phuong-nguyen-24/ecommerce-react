import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ykuvzbakqaaeunxqgnhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdXZ6YmFrcWFhZXVueHFnbmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5ODA1ODYsImV4cCI6MTk5NzU1NjU4Nn0.4dgH100v05vu__v3J7ZIFbOIDUiALtHszHDH9pXM3dk"
);


export default supabase;