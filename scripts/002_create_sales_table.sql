-- Create sales table to track pin purchases
CREATE TABLE IF NOT EXISTS public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pin_id UUID NOT NULL REFERENCES public.pins(id) ON DELETE CASCADE,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'NGN',
  paystack_reference VARCHAR(255) UNIQUE,
  payment_status VARCHAR(20) DEFAULT 'pending',
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Create policies - sales should only be accessible through backend API
CREATE POLICY "sales_admin_only" ON public.sales
  FOR ALL USING (FALSE);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_sales_customer_email ON public.sales(customer_email);
CREATE INDEX IF NOT EXISTS idx_sales_paystack_reference ON public.sales(paystack_reference);
CREATE INDEX IF NOT EXISTS idx_sales_payment_status ON public.sales(payment_status);
CREATE INDEX IF NOT EXISTS idx_sales_transaction_date ON public.sales(transaction_date);
