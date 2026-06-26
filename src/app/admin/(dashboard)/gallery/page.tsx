import { createClient } from '@/utils/supabase/server'
import GalleryClient from './GalleryClient'

export default async function GalleryAdminPage() {
  const supabase = await createClient()
  
  const { data: designs } = await supabase
    .from('gallery_designs')
    .select('*')
    .neq('category', 'Hero Slider')
    .order('created_at', { ascending: false })

  const { data: catalogs } = await supabase
    .from('catalogs')
    .select('filter_name')
    .order('order_index', { ascending: true })
    
  const categories = catalogs ? catalogs.map(c => c.filter_name) : []

  return <GalleryClient initialDesigns={designs || []} categories={categories} />
}
