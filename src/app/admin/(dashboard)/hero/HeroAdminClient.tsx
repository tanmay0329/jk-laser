'use client'

import { useState } from 'react'
import { Image as ImageIcon, Plus, X, Trash, Upload } from 'lucide-react'
import { addHeroImage, deleteHeroImage } from './actions'

export interface HeroImage {
  id: string
  image_url: string
}

export default function HeroAdminClient({ initialImages }: { initialImages: HeroImage[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function handleAdd(formData: FormData) {
    setIsLoading(true)
    setError('')
    const result = await addHeroImage(formData)
    setIsLoading(false)
    if (result.success) {
      setIsModalOpen(false)
      setPreview(null)
    } else {
      setError(result.message || 'Failed to upload image')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this hero image?')) {
      setDeletingId(id)
      await deleteHeroImage(id)
      setDeletingId(null)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage Hero Images</h1>
          <p className="text-muted-foreground">Upload and manage the floating Custom Design images in the Hero section.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-black hover:bg-white px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase"
        >
          <Plus size={16} />
          Add New Image
        </button>
      </div>
      
      {(!initialImages || initialImages.length === 0) ? (
        <div className="bg-[#121212] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/30 mb-4">
            <ImageIcon size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Hero Images Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You haven't uploaded any custom designs for the hero section yet. Click the "Add New Image" button to start.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {initialImages.map((image) => (
            <div key={image.id} className="bg-[#121212] border border-white/10 rounded-lg overflow-hidden group relative">
              <div className="aspect-[4/5] relative bg-black/50 p-2">
                <img 
                  src={image.image_url} 
                  alt="Hero Image"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Hover Actions */}
              <div className={`absolute top-2 right-2 transition-opacity ${deletingId === image.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button 
                  onClick={() => handleDelete(image.id)}
                  disabled={deletingId === image.id}
                  className="bg-black/80 hover:bg-red-500 text-white p-2 rounded-md transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === image.id ? (
                    <span className="text-xs uppercase tracking-wider font-bold px-1">Deleting...</span>
                  ) : (
                    <Trash size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-white/10 rounded-xl w-full max-w-xl p-6 relative my-8">
            <button onClick={() => { setIsModalOpen(false); setPreview(null); }} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Upload Hero Image</h2>
            
            <form action={handleAdd} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Design Image</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    required 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  {preview ? (
                    <div className="flex justify-center">
                      <img src={preview} alt="Preview" className="h-40 object-contain rounded-md" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8">
                      <Upload size={32} className="text-white/30" />
                      <p className="text-sm text-white/70">Click or drag image to upload</p>
                      <p className="text-xs text-white/40">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
              
              {error && <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md"><p className="text-red-400 text-sm">{error}</p></div>}
              
              <div className="flex justify-end gap-3 mt-2 border-t border-white/10 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setPreview(null); }} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
