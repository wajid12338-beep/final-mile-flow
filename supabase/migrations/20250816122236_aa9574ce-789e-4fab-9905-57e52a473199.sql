-- Fix security vulnerability: Remove public access to bookings table
-- This prevents unauthenticated users from viewing sensitive customer data

DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id);