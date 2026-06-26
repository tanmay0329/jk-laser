import { createClient } from '@/utils/supabase/server'
import CatalogsClient from './CatalogsClient'

export const metadata = {
  title: 'Manage Catalogs | JK Laser Admin',
}

export default async function CatalogsPage() {
  const supabase = await createClient()
  
  const { data: catalogs } = await supabase
    .from('catalogs')
    .select('*')
    .order('order_index', { ascending: true })

  return <CatalogsClient initialCatalogs={catalogs || []} />
}
