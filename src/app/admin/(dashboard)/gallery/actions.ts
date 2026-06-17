'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addGalleryDesign(formData: FormData) {
  const supabase = await createClient()
  
  const category = formData.get('category') as string
  const designNumber = formData.get('designNumber') as string
  const file = formData.get('image') as File
  
  if (!file || file.size === 0) {
    return { success: false, message: 'Image file is required.' }
  }

  // 1. Upload the file to Supabase Storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `gallery/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (uploadError) {
    return { success: false, message: `Upload error: ${uploadError.message}` }
  }

  // 2. Get Public URL
  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)
    
  const imageUrl = publicUrlData.publicUrl

  // 3. Insert into Database
  const { error: dbError } = await supabase.from('gallery_designs').insert({
    category,
    design_number: designNumber,
    image_url: imageUrl
  })

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return { success: true }
}

export async function deleteGalleryDesign(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('gallery_designs').delete().eq('id', id)
  
  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return { success: true }
}
