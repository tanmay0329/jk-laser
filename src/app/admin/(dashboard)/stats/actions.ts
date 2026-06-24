'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateStats(formData: FormData) {
  const supabase = await createClient()
  
  const designs_count = parseInt(formData.get('designs_count') as string, 10)
  const projects_count = parseInt(formData.get('projects_count') as string, 10)
  const clients_count = parseInt(formData.get('clients_count') as string, 10)
  const experience_years = parseInt(formData.get('experience_years') as string, 10)
  
  if (isNaN(designs_count) || isNaN(projects_count) || isNaN(clients_count) || isNaN(experience_years)) {
    return { success: false, message: 'All fields must be valid numbers' }
  }

  // Update the row where id = 1
  const { error: dbError } = await supabase
    .from('company_stats')
    .upsert({ 
      id: 1, 
      designs_count, 
      projects_count, 
      clients_count, 
      experience_years,
      updated_at: new Date().toISOString()
    })

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/stats')
  revalidatePath('/')
  return { success: true }
}
