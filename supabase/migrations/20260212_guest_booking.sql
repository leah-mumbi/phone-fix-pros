ALTER TABLE public.repair_bookings ALTER COLUMN user_id DROP NOT NULL;
CREATE POLICY "Guests can create bookings" ON public.repair_bookings FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Public can view bookings by tracking id" ON public.repair_bookings FOR SELECT USING (tracking_id IS NOT NULL);
