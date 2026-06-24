'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addHeroImage(formData: FormData) {
  const supabase = await createClient()
  
  const file = formData.get('image') as File | null
  
  if (!file || file.size === 0) {
    return { success: false, message: 'Image is required' }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `hero/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (uploadError) {
    return { success: false, message: `Upload error: ${uploadError.message}` }
  }

  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)
    
  const imageUrl = publicUrlData.publicUrl

  // Force category to be 'Hero Slider'
  const { error: dbError } = await supabase
    .from('gallery_designs')
    .insert([{ 
      category: 'Hero Slider',
      design_number: `Hero-${Date.now().toString().slice(-4)}`,
      image_url: imageUrl 
    }])

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/hero')
  revalidatePath('/')
  return { success: true }
}

export async function deleteHeroImage(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('gallery_designs').delete().eq('id', id)
  
  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/hero')
  revalidatePath('/')
  return { success: true }
}
