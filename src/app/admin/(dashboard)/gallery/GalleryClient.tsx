'use client'

import { useState } from 'react'
import { Image as ImageIcon, Plus, X, Trash, Upload } from 'lucide-react'
import { addGalleryDesign, deleteGalleryDesign } from './actions'

export interface GalleryDesign {
  id: string
  category: string
  design_number: string
  image_url: string
}

export default function GalleryClient({ initialDesigns, categories = [] }: { initialDesigns: GalleryDesign[], categories?: string[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  // If no dynamic categories are provided, fall back to the defaults (or just use an empty array if preferred, but fallback is safer)
  const availableCategories = categories.length > 0 ? categories : [
    "JK Building Elevation Design", 
    "JK Elevation Design", 
    "JK Door", 
    "JK Gates", 
    "JK Grill", 
    "JK Wall Art"
  ]

  async function handleAdd(formData: FormData) {
    setIsLoading(true)
    setError('')
    const result = await addGalleryDesign(formData)
    setIsLoading(false)
    if (result.success) {
      setIsModalOpen(false)
      setPreview(null)
    } else {
      setError(result.message || 'Failed to upload design')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this design?')) {
      setDeletingId(id)
      await deleteGalleryDesign(id)
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
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage Design Gallery</h1>
          <p className="text-muted-foreground">Add, remove, and categorize laser cut designs.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-black hover:bg-white px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase"
        >
          <Plus size={16} />
          Add New Design
        </button>
      </div>
      
      {(!initialDesigns || initialDesigns.length === 0) ? (
        <div className="bg-[#121212] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/30 mb-4">
            <ImageIcon size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Designs Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Your Supabase database is currently empty. Click the "Add New Design" button above to upload your first image!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {initialDesigns.map((design) => (
            <div key={design.id} className="bg-[#121212] border border-white/10 rounded-lg overflow-hidden group relative">
              <div className="aspect-[4/5] relative bg-black/50">
                <img 
                  src={design.image_url} 
                  alt={design.design_number}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1 truncate">{design.category}</p>
                <p className="text-white font-medium">{design.design_number}</p>
              </div>
              {/* Hover Actions */}
              <div className={`absolute top-2 right-2 transition-opacity ${deletingId === design.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button 
                  onClick={() => handleDelete(design.id)}
                  disabled={deletingId === design.id}
                  className="bg-black/80 hover:bg-red-500 text-white p-2 rounded-md transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === design.id ? (
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
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Upload New Design</h2>
            
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Category</label>
                  <select required name="category" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none appearance-none">
                    {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Design Number</label>
                  <input required name="designNumber" placeholder="e.g. G045" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none" />
                </div>
              </div>
              
              {error && <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md"><p className="text-red-400 text-sm">{error}</p></div>}
              
              <div className="flex justify-end gap-3 mt-2 border-t border-white/10 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setPreview(null); }} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? 'Uploading...' : 'Upload Design'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
