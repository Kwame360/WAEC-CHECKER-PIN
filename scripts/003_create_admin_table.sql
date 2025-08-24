-- Create admin table for backend authentication
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies - admins table should only be accessible through backend API
CREATE POLICY "admins_backend_only" ON public.admins
  FOR ALL USING (FALSE);

-- Insert predefined admin credentials (password will be hashed in the app)
INSERT INTO public.admins (username, password_hash) 
VALUES ('bringyourownlaptop', '$2b$12$placeholder_hash_will_be_replaced')
ON CONFLICT (username) DO NOTHING;
