import { createClient } from '@/utils/supabase/server'
import HeroAdminClient from './HeroAdminClient'

export default async function AdminHeroPage() {
  const supabase = await createClient()
  
  const { data: heroImages } = await supabase
    .from('gallery_designs')
    .select('*')
    .eq('category', 'Hero Slider')
    .order('created_at', { ascending: false })

  return <HeroAdminClient initialImages={heroImages || []} />
}
