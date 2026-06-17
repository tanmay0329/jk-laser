CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public testimonials are viewable by everyone." 
ON public.testimonials FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert testimonials." 
ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials." 
ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials." 
ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');
