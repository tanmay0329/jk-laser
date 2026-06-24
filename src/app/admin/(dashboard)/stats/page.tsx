import { createClient } from '@/utils/supabase/server'
import StatsAdminClient from './StatsAdminClient'

export default async function AdminStatsPage() {
  const supabase = await createClient()
  
  const { data: statsData } = await supabase
    .from('company_stats')
    .select('*')
    .eq('id', 1)
    .single()

  return <StatsAdminClient initialStats={statsData || null} />
}
