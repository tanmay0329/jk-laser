-- 1. Create the tables
CREATE TABLE IF NOT EXISTS public.gallery_designs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  design_number TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.featured_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.gallery_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_projects ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for Tables
-- Allow public read access
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.gallery_designs FOR SELECT USING (true);

CREATE POLICY "Public featured projects are viewable by everyone." 
ON public.featured_projects FOR SELECT USING (true);

-- Allow authenticated users to mutate data
CREATE POLICY "Authenticated users can insert designs." 
ON public.gallery_designs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update designs." 
ON public.gallery_designs FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete designs." 
ON public.gallery_designs FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert featured projects." 
ON public.featured_projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update featured projects." 
ON public.featured_projects FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete featured projects." 
ON public.featured_projects FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Set up Storage for Images
-- Note: You might need to run this manually in the Supabase UI if the storage schema isn't fully accessible via the raw SQL editor.
-- But running it here ensures the bucket exists and public access is configured.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the images bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload, update, and delete images
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
