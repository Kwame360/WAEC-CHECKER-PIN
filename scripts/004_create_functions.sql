-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for pins table
DROP TRIGGER IF EXISTS update_pins_updated_at ON public.pins;
CREATE TRIGGER update_pins_updated_at
    BEFORE UPDATE ON public.pins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to get available pin (secure way to fetch unsold pins)
CREATE OR REPLACE FUNCTION get_available_pin()
RETURNS TABLE(pin_id UUID, pin_code VARCHAR, serial_number VARCHAR) 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.pin_code, p.serial_number
  FROM public.pins p
  WHERE p.is_sold = FALSE
  ORDER BY p.created_at ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create function to mark pin as sold
CREATE OR REPLACE FUNCTION mark_pin_sold(pin_uuid UUID, customer_email_param VARCHAR, customer_phone_param VARCHAR, amount_param DECIMAL, paystack_ref VARCHAR)
RETURNS UUID
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sale_id UUID;
BEGIN
  -- Update pin as sold
  UPDATE public.pins 
  SET is_sold = TRUE, updated_at = NOW()
  WHERE id = pin_uuid AND is_sold = FALSE;
  
  -- Check if pin was actually updated
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pin not available or already sold';
  END IF;
  
  -- Create sale record
  INSERT INTO public.sales (pin_id, customer_email, customer_phone, amount, paystack_reference, payment_status)
  VALUES (pin_uuid, customer_email_param, customer_phone_param, amount_param, paystack_ref, 'completed')
  RETURNING id INTO sale_id;
  
  RETURN sale_id;
END;
$$ LANGUAGE plpgsql;
