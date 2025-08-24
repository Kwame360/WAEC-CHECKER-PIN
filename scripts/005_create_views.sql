-- Create view for admin dashboard statistics
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM public.pins) as total_pins,
  (SELECT COUNT(*) FROM public.pins WHERE is_sold = TRUE) as sold_pins,
  (SELECT COUNT(*) FROM public.pins WHERE is_sold = FALSE) as available_pins,
  (SELECT COUNT(*) FROM public.sales WHERE payment_status = 'completed') as completed_sales,
  (SELECT COALESCE(SUM(amount), 0) FROM public.sales WHERE payment_status = 'completed') as total_revenue,
  (SELECT COUNT(*) FROM public.sales WHERE DATE(transaction_date) = CURRENT_DATE) as today_sales;

-- Create view for recent sales
CREATE OR REPLACE VIEW recent_sales AS
SELECT 
  s.id,
  s.customer_email,
  s.customer_phone,
  s.amount,
  s.currency,
  s.paystack_reference,
  s.payment_status,
  s.transaction_date,
  p.pin_code,
  p.serial_number
FROM public.sales s
JOIN public.pins p ON s.pin_id = p.id
ORDER BY s.transaction_date DESC;
