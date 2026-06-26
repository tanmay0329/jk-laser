-- 1. Create the catalogs table
CREATE TABLE IF NOT EXISTS public.catalogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  filter_name TEXT NOT NULL,
  icon TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL DEFAULT '/images/services/elevation-designs.jpg',
  order_index INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert the default initial data to match the existing categories
INSERT INTO public.catalogs (title, filter_name, icon, items, image_url, order_index)
VALUES 
  ('JK BUILDING ELEVATION DESIGN', 'JK Building Elevation Design', '🏢', ARRAY['Commercial Exteriors', 'Residential Facades', 'Modern Elevations'], '/images/services/BUILDING%20ELEVATION%20DESIGn/8.jfif', 1),
  ('JK ELEVATION DESIGN', 'JK Elevation Design', '◨', ARRAY['Wall Panels', 'CNC Screens', 'Room Dividers'], '/images/services/ELEVATION%20DESIGN/05aa6e05-efc8-4552-a7fe-447fb9988cbf.jfif', 2),
  ('JK DOOR', 'JK Door', '🚪', ARRAY['Safety Doors', 'Main Doors', 'Custom Laser Doors'], '/images/services/door/105.png', 3),
  ('JK GATES', 'JK Gates', '⛩️', ARRAY['Main Gates', 'Compound Gates', 'Sliding Gates'], '/images/services/gates/10.png', 4),
  ('JK GRILL', 'JK Grill', '🪟', ARRAY['Window Grills', 'Balcony Grills', 'Safety Grills'], '/images/services/grill/03b65e10-94af-4adf-b573-118ec14dfc05.jfif', 5),
  ('JK WALL ART', 'JK Wall Art', '✨', ARRAY['Interior Wall Art', 'Metal Wall Decor', 'Custom Art'], '/images/services/wall%20art/2D%20Dragon%20Head%20Wall%20Art.jfif', 6);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.catalogs ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Allow public read access
CREATE POLICY "Public catalogs are viewable by everyone." 
ON public.catalogs FOR SELECT USING (true);

-- Allow authenticated users to mutate data
CREATE POLICY "Authenticated users can insert catalogs." 
ON public.catalogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update catalogs." 
ON public.catalogs FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete catalogs." 
ON public.catalogs FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
