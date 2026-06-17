'use client'

import { useState } from 'react'
import { Star, Pencil, Trash, Plus, X } from 'lucide-react'
import { addReview, deleteReview } from './actions'

export interface Review {
  id: string
  name: string
  company: string
  text: string
  rating: number
}

export default function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(formData: FormData) {
    setIsLoading(true)
    setError('')
    const result = await addReview(formData)
    setIsLoading(false)
    if (result.success) {
      setIsModalOpen(false)
    } else {
      setError(result.message || 'Failed to add review')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(id)
    }
  }

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage Testimonials</h1>
          <p className="text-muted-foreground">Add, edit, or remove client reviews displayed on the website.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-black hover:bg-white px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase"
        >
          <Plus size={16} />
          Add New Review
        </button>
      </div>

      {(!initialReviews || initialReviews.length === 0) ? (
        <div className="bg-[#121212] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/30 mb-4">
            <Star size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Reviews Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Database is currently empty for testimonials. Click the "Add New Review" button above to add one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialReviews.map((review) => (
            <div key={review.id} className="bg-[#121212] border border-white/10 p-6 rounded-xl flex flex-col gap-4">
              <div className="flex text-primary">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-white/80 text-sm italic flex-1">"{review.text}"</p>
              <div className="border-t border-white/10 pt-4 mt-auto">
                <h4 className="font-bold text-white">{review.name}</h4>
                <p className="text-primary text-xs uppercase tracking-wide">{review.company}</p>
              </div>
              <div className="flex justify-end gap-3 mt-4 border-t border-white/5 pt-4">
                <button onClick={() => handleDelete(review.id)} className="text-red-500/50 hover:text-red-500 transition-colors">
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/10 rounded-xl w-full max-w-lg p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Add New Review</h2>
            
            <form action={handleAdd} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Client Name</label>
                <input required name="name" className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Company / Role (Optional)</label>
                <input name="company" className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Review Text</label>
                <textarea required name="text" rows={4} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none"></textarea>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Rating (1-5)</label>
                <input required type="number" min="1" max="5" defaultValue="5" name="rating" className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none" />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors disabled:opacity-50">
                  {isLoading ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
