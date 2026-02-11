-- Create custom user profiles table extending Supabase Auth
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  PRIMARY KEY (id)
);

-- Create user_roles table for managing roles separately if needed
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  assigned_by UUID REFERENCES public.users(id),
  reason TEXT,
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table

-- Policy 1: Users can read their own profile
CREATE POLICY "Users can read their own profile" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Users can read all public user info (for display purposes)
CREATE POLICY "Public profiles are viewable by everyone" ON public.users
  FOR SELECT
  USING (true);

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 4: Only admins can delete users
CREATE POLICY "Only admins can delete users" ON public.users
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Policy 5: Only admins can update user roles
CREATE POLICY "Only admins can update user roles" ON public.users
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- RLS Policies for user_roles table

-- Policy 1: Users can read their own roles
CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 2: Admins can read all roles
CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Policy 3: Only admins can insert roles
CREATE POLICY "Only admins can insert roles" ON public.user_roles
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Policy 4: Only admins can update roles
CREATE POLICY "Only admins can update roles" ON public.user_roles
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Policy 5: Only admins can delete roles
CREATE POLICY "Only admins can delete roles" ON public.user_roles
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Create trigger function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to call the function on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_created_at ON public.users(created_at);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
SELECT EXISTS(
  SELECT 1 FROM public.users 
  WHERE id = user_id AND role = 'admin'
);
$$ LANGUAGE sql SECURITY DEFINER;

-- Create a function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
SELECT role FROM public.users WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.users TO anon, authenticated;
GRANT UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
