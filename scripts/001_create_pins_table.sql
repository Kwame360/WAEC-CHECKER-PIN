-- Create pins table to store pin codes and serial numbers
CREATE TABLE IF NOT EXISTS public.pins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pin_code VARCHAR(20) NOT NULL UNIQUE,
  serial_number VARCHAR(50) NOT NULL UNIQUE,
  is_sold BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.pins ENABLE ROW LEVEL SECURITY;

-- Create policies - pins should only be accessible through backend API calls
-- No direct user access to pins table for security
CREATE POLICY "pins_admin_only" ON public.pins
  FOR ALL USING (FALSE);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pins_pin_code ON public.pins(pin_code);
CREATE INDEX IF NOT EXISTS idx_pins_serial_number ON public.pins(serial_number);
CREATE INDEX IF NOT EXISTS idx_pins_is_sold ON public.pins(is_sold);
