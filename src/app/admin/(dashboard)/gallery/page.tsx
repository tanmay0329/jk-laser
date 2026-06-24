import { createClient } from '@/utils/supabase/server'
import GalleryClient from './GalleryClient'

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  
  const { data: galleryImages } = await supabase
    .from('gallery_designs')
    .select('*')
    .neq('category', 'Hero Slider')
    .order('created_at', { ascending: false })

  return <GalleryClient initialDesigns={galleryImages || []} />
}
