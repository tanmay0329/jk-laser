import { createClient } from '@/utils/supabase/server'
import ReviewsClient from './ReviewsClient'

export default async function AdminReviewsPage() {
  const supabase = await createClient()
  
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  return <ReviewsClient initialReviews={testimonials || []} />
}
