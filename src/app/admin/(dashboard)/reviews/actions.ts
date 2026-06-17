'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addReview(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const company = formData.get('company') as string
  const text = formData.get('text') as string
  const rating = parseInt(formData.get('rating') as string) || 5

  const { error } = await supabase.from('testimonials').insert({
    name,
    company,
    text,
    rating
  })

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/')
  return { success: true }
}

export async function deleteReview(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  
  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/')
  return { success: true }
}
