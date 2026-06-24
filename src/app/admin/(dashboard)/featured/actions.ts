'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateFeaturedProject(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const file = formData.get('image') as File | null
  
  let imageUrl = formData.get('existingImageUrl') as string

  // If user uploaded a new image, upload it to storage
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `featured/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      return { success: false, message: `Upload error: ${uploadError.message}` }
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)
      
    imageUrl = publicUrlData.publicUrl
  }

  // Update DB
  const { error: dbError } = await supabase
    .from('featured_projects')
    .update({ title, description, image_url: imageUrl })
    .eq('id', id)

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/featured')
  revalidatePath('/')
  return { success: true }
}

export async function addFeaturedProject(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const file = formData.get('image') as File | null
  
  if (!file || file.size === 0) {
    return { success: false, message: 'Image is required' }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `featured/${fileName}`

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

  const { error: dbError } = await supabase
    .from('featured_projects')
    .insert([{ title, description, image_url: imageUrl }])

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/featured')
  revalidatePath('/')
  return { success: true }
}

export async function deleteFeaturedProject(id: string) {
  const supabase = await createClient()

  // Note: We're not deleting the image from storage here for simplicity, 
  // but in a production app you'd want to fetch the url and delete the object as well.
  const { error } = await supabase
    .from('featured_projects')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, message: `Database error: ${error.message}` }
  }

  revalidatePath('/admin/featured')
  revalidatePath('/')
  return { success: true }
}
