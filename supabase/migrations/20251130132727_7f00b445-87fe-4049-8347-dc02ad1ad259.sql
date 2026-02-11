-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- Create repair bookings table
CREATE TABLE public.repair_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  device_model TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.repair_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own bookings"
ON public.repair_bookings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
ON public.repair_bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON public.repair_bookings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings"
ON public.repair_bookings
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.repair_bookings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();