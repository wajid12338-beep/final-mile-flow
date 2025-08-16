-- Add vehicle_type column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN vehicle_type TEXT;