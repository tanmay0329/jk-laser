'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCatalog(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const filter_name = formData.get('filter_name') as string
  const icon = formData.get('icon') as string
  const itemsString = formData.get('items') as string
  const file = formData.get('image') as File | null
  const order_index = parseInt(formData.get('order_index') as string, 10) || 0
  
  let imageUrl = formData.get('existingImageUrl') as string

  // Items are expected as a comma-separated string
  const items = itemsString.split(',').map(item => item.trim()).filter(Boolean)

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `catalogs/${fileName}`

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

  const { error: dbError } = await supabase
    .from('catalogs')
    .update({ title, filter_name, icon, items, image_url: imageUrl, order_index })
    .eq('id', id)

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/catalogs')
  revalidatePath('/')
  return { success: true }
}

export async function addCatalog(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const filter_name = formData.get('filter_name') as string
  const icon = formData.get('icon') as string
  const itemsString = formData.get('items') as string
  const file = formData.get('image') as File | null
  const order_index = parseInt(formData.get('order_index') as string, 10) || 0
  
  const items = itemsString.split(',').map(item => item.trim()).filter(Boolean)
  
  let imageUrl = '/images/services/elevation-designs.jpg' // Default image if none provided

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `catalogs/${fileName}`

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

  const { error: dbError } = await supabase
    .from('catalogs')
    .insert([{ title, filter_name, icon, items, image_url: imageUrl, order_index }])

  if (dbError) {
    return { success: false, message: `Database error: ${dbError.message}` }
  }

  revalidatePath('/admin/catalogs')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCatalog(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('catalogs')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, message: `Database error: ${error.message}` }
  }

  revalidatePath('/admin/catalogs')
  revalidatePath('/')
  return { success: true }
}

export async function seedDefaultCatalogs() {
  const supabase = await createClient()
  
  const defaultCatalogs = [
    {
      title: 'JK BUILDING ELEVATION DESIGN',
      filter_name: 'JK Building Elevation Design',
      icon: '🏢',
      items: ['Commercial Exteriors', 'Residential Facades', 'Modern Elevations'],
      image_url: '/images/services/BUILDING%20ELEVATION%20DESIGn/8.jfif',
      order_index: 1
    },
    {
      title: 'JK ELEVATION DESIGN',
      filter_name: 'JK Elevation Design',
      icon: '◨',
      items: ['Wall Panels', 'CNC Screens', 'Room Dividers'],
      image_url: '/images/services/ELEVATION%20DESIGN/05aa6e05-efc8-4552-a7fe-447fb9988cbf.jfif',
      order_index: 2
    },
    {
      title: 'JK DOOR',
      filter_name: 'JK Door',
      icon: '🚪',
      items: ['Safety Doors', 'Main Doors', 'Custom Laser Doors'],
      image_url: '/images/services/door/105.png',
      order_index: 3
    },
    {
      title: 'JK GATES',
      filter_name: 'JK Gates',
      icon: '⛩️',
      items: ['Main Gates', 'Compound Gates', 'Sliding Gates'],
      image_url: '/images/services/gates/10.png',
      order_index: 4
    },
    {
      title: 'JK GRILL',
      filter_name: 'JK Grill',
      icon: '🪟',
      items: ['Window Grills', 'Balcony Grills', 'Safety Grills'],
      image_url: '/images/services/grill/03b65e10-94af-4adf-b573-118ec14dfc05.jfif',
      order_index: 5
    },
    {
      title: 'JK WALL ART',
      filter_name: 'JK Wall Art',
      icon: '✨',
      items: ['Interior Wall Art', 'Metal Wall Decor', 'Custom Art'],
      image_url: '/images/services/wall%20art/2D%20Dragon%20Head%20Wall%20Art.jfif',
      order_index: 6
    }
  ]

  const { error } = await supabase
    .from('catalogs')
    .insert(defaultCatalogs)

  if (error) {
    return { success: false, message: `Database error: ${error.message}` }
  }

  revalidatePath('/admin/catalogs')
  revalidatePath('/')
  return { success: true }
}
