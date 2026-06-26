-- 1. Create the company_stats table
CREATE TABLE IF NOT EXISTS public.company_stats (
  id INTEGER PRIMARY KEY,
  designs_count INTEGER NOT NULL DEFAULT 350,
  projects_count INTEGER NOT NULL DEFAULT 150,
  clients_count INTEGER NOT NULL DEFAULT 120,
  experience_years INTEGER NOT NULL DEFAULT 5,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert default row if it doesn't exist
INSERT INTO public.company_stats (id, designs_count, projects_count, clients_count, experience_years)
VALUES (1, 350, 150, 120, 5)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.company_stats ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Allow public read access
CREATE POLICY "Public company stats are viewable by everyone." 
ON public.company_stats FOR SELECT USING (true);

-- Allow authenticated users to mutate data
CREATE POLICY "Authenticated users can insert stats." 
ON public.company_stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update stats." 
ON public.company_stats FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete stats." 
ON public.company_stats FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
