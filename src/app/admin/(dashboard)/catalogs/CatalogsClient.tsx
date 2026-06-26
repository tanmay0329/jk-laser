'use client'

import { useState } from 'react'
import { Image as ImageIcon, Plus, X, Trash, Upload, Edit, Download } from 'lucide-react'
import { addCatalog, updateCatalog, deleteCatalog, seedDefaultCatalogs } from './actions'

export interface Catalog {
  id: string
  title: string
  filter_name: string
  icon: string
  items: string[]
  image_url: string
  order_index: number
}

export default function CatalogsClient({ initialCatalogs }: { initialCatalogs: Catalog[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCatalog, setEditingCatalog] = useState<Catalog | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function handleAddOrUpdate(formData: FormData) {
    setIsLoading(true)
    setError('')
    
    let result;
    if (editingCatalog) {
      formData.append('id', editingCatalog.id)
      formData.append('existingImageUrl', editingCatalog.image_url)
      result = await updateCatalog(formData)
    } else {
      result = await addCatalog(formData)
    }

    setIsLoading(false)
    if (result.success) {
      closeModal()
    } else {
      setError(result.message || 'Failed to save catalog')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this catalog? This will remove it from the Home Page and Gallery categories.')) {
      setDeletingId(id)
      await deleteCatalog(id)
      setDeletingId(null)
    }
  }

  async function handleSeed() {
    setIsSeeding(true)
    const result = await seedDefaultCatalogs()
    setIsSeeding(false)
    if (!result.success) {
      setError(result.message || 'Failed to import default catalogs')
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

  const openEditModal = (catalog: Catalog) => {
    setEditingCatalog(catalog)
    setPreview(catalog.image_url)
    setIsModalOpen(true)
  }

  const openAddModal = () => {
    setEditingCatalog(null)
    setPreview(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCatalog(null)
    setPreview(null)
    setError('')
  }

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage JK Catalogs</h1>
          <p className="text-muted-foreground">Manage the catalogs (categories) shown on the Home Page and Gallery.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-black hover:bg-white px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase"
        >
          <Plus size={16} />
          Add New Catalog
        </button>
      </div>
      
      {(!initialCatalogs || initialCatalogs.length === 0) ? (
        <div className="bg-[#121212] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/30 mb-4">
            <ImageIcon size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Catalogs Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You can add a new catalog manually, or import the default JK Laser catalogs to get started.
          </p>
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <div className="flex gap-4">
            <button 
              onClick={handleSeed}
              disabled={isSeeding}
              className="flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase disabled:opacity-50"
            >
              {isSeeding ? 'Importing...' : (
                <>
                  <Download size={16} />
                  Import Defaults
                </>
              )}
            </button>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 bg-primary text-black hover:bg-white px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase"
            >
              <Plus size={16} />
              Add Manually
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialCatalogs.map((catalog) => (
            <div key={catalog.id} className="bg-[#121212] border border-white/10 rounded-lg overflow-hidden group relative flex flex-col">
              <div className="aspect-video relative bg-black/50">
                <img 
                  src={catalog.image_url} 
                  alt={catalog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/80 flex items-center justify-center border border-white/10">
                  <span className="text-sm">{catalog.icon}</span>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={() => openEditModal(catalog)}
                    className="bg-black/80 hover:bg-primary hover:text-black text-white p-2 rounded-md transition-colors border border-white/10"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(catalog.id)}
                    disabled={deletingId === catalog.id}
                    className="bg-black/80 hover:bg-red-500 text-white p-2 rounded-md transition-colors border border-white/10 disabled:opacity-50"
                  >
                    {deletingId === catalog.id ? (
                      <span className="text-xs uppercase tracking-wider font-bold px-1">...</span>
                    ) : (
                      <Trash size={14} />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg text-white font-bold mb-1 truncate">{catalog.title}</h3>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">Filter: {catalog.filter_name}</p>
                <div className="mt-auto">
                  <p className="text-xs text-muted-foreground mb-1">Sub-items:</p>
                  <div className="flex flex-wrap gap-1">
                    {catalog.items.map((item, i) => (
                      <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/70">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-white/10 rounded-xl w-full max-w-xl p-6 relative my-8">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              {editingCatalog ? 'Edit Catalog' : 'Add New Catalog'}
            </h2>
            
            <form action={handleAddOrUpdate} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Cover Image (Optional)</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  {preview ? (
                    <div className="flex justify-center">
                      <img src={preview} alt="Preview" className="h-32 object-cover rounded-md" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <Upload size={24} className="text-white/30" />
                      <p className="text-xs text-white/70">Click or drag image to upload new cover</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Display Title</label>
                  <input required name="title" defaultValue={editingCatalog?.title} placeholder="e.g. JK BUILDING ELEVATION DESIGN" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Gallery Filter Name</label>
                  <input required name="filter_name" defaultValue={editingCatalog?.filter_name} placeholder="e.g. JK Building Elevation Design" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Icon (Emoji)</label>
                  <input required name="icon" defaultValue={editingCatalog?.icon} placeholder="e.g. 🏢" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Order Index</label>
                  <input type="number" required name="order_index" defaultValue={editingCatalog?.order_index || 0} placeholder="e.g. 1" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Sub-items (comma separated)</label>
                <input required name="items" defaultValue={editingCatalog?.items.join(', ')} placeholder="e.g. Commercial Exteriors, Residential Facades, Modern Elevations" className="w-full bg-black border border-white/20 rounded-md px-4 py-2.5 text-white focus:border-primary focus:outline-none" />
              </div>
              
              {error && <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md"><p className="text-red-400 text-sm">{error}</p></div>}
              
              <div className="flex justify-end gap-3 mt-2 border-t border-white/10 pt-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? 'Saving...' : 'Save Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
