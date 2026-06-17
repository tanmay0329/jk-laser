import { createClient } from '@/utils/supabase/server'
import FeaturedClient from './FeaturedClient'

export default async function AdminFeaturedPage() {
  const supabase = await createClient()
  
  const { data: projects } = await supabase
    .from('featured_projects')
    .select('*')
    .order('order_index', { ascending: true })

  return <FeaturedClient initialProjects={projects || []} />
}
