CREATE OR REPLACE FUNCTION public.get_booking_by_public_key(_tracking_id TEXT, _phone TEXT)
RETURNS SETOF public.repair_bookings
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.repair_bookings
  WHERE tracking_id = _tracking_id
    AND customer_phone = _phone;
$$;
