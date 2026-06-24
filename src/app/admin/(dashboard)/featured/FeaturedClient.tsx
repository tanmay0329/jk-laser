'use client'

import { useState } from 'react'
import { LayoutTemplate, Pencil, X, Upload, Plus, Trash } from 'lucide-react'
import { updateFeaturedProject, addFeaturedProject, deleteFeaturedProject } from './actions'

export interface FeaturedProject {
  id: string
  title: string
  description: string
  image_url: string
  order_index: number
}

export default function FeaturedClient({ initialProjects }: { initialProjects: FeaturedProject[] }) {
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function handleAdd(formData: FormData) {
    setIsLoading(true)
    setError('')
    const result = await addFeaturedProject(formData)
    setIsLoading(false)
    if (result.success) {
      setIsAddModalOpen(false)
      setPreview(null)
    } else {
      setError(result.message || 'Failed to add project')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this featured project?')) {
      setDeletingId(id)
      await deleteFeaturedProject(id)
      setDeletingId(null)
    }
  }

  async function handleUpdate(formData: FormData) {
    setIsLoading(true)
    setError('')
    const result = await updateFeaturedProject(formData)
    setIsLoading(false)
    if (result.success) {
      setEditingProject(null)
      setPreview(null)
    } else {
      setError(result.message || 'Failed to update project')
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
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage Featured Projects</h1>
          <p className="text-muted-foreground">Add or update the featured projects on your homepage.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-black hover:bg-white px-4 py-2 rounded-md transition-colors text-sm font-bold tracking-wide uppercase"
        >
          <Plus size={16} />
          Add New Project
        </button>
      </div>
      
      {(!initialProjects || initialProjects.length === 0) ? (
        <div className="bg-[#121212] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/30 mb-4">
            <LayoutTemplate size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Featured Projects</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Database is currently empty for featured projects. Add projects from the database to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialProjects.map((project, index) => (
            <div key={project.id} className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/3 bg-black aspect-video md:aspect-auto relative border-r border-white/10">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-contain p-2"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-xl font-bold text-white">{project.title}</h3>
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Slot {index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setEditingProject(project)}
                    className="flex items-center gap-2 text-sm text-primary hover:text-white font-medium transition-colors w-fit"
                  >
                    <Pencil size={14} />
                    Edit Feature
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 font-medium transition-colors w-fit disabled:opacity-50"
                  >
                    {deletingId === project.id ? 'Deleting...' : (
                      <>
                        <Trash size={14} />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-white/10 rounded-xl w-full max-w-xl p-6 relative my-8">
            <button onClick={() => { setIsAddModalOpen(false); setPreview(null); }} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Add Featured Project</h2>
            
            <form action={handleAdd} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Project Image</label>
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

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Title</label>
                <input required name="title" placeholder="e.g. Modern Architecture" className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Description</label>
                <textarea required name="description" rows={4} placeholder="Describe the featured project..." className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none"></textarea>
              </div>
              
              {error && <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md"><p className="text-red-400 text-sm">{error}</p></div>}
              
              <div className="flex justify-end gap-3 mt-2 border-t border-white/10 pt-4">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setPreview(null); }} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? 'Adding...' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-white/10 rounded-xl w-full max-w-xl p-6 relative my-8">
            <button onClick={() => { setEditingProject(null); setPreview(null); }} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Edit Featured Project</h2>
            
            <form action={handleUpdate} className="flex flex-col gap-5">
              <input type="hidden" name="id" value={editingProject.id} />
              <input type="hidden" name="existingImageUrl" value={editingProject.image_url} />

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Project Image</label>
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
                      <img src={preview} alt="Preview" className="h-40 object-contain rounded-md" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <img src={editingProject.image_url} alt="Current" className="h-32 object-contain rounded-md mb-2 opacity-50" />
                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        <Upload size={16} />
                        <span>Click to replace image (Optional)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Title</label>
                <input required name="title" defaultValue={editingProject.title} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1 block">Description</label>
                <textarea required name="description" rows={4} defaultValue={editingProject.description} className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:border-primary focus:outline-none"></textarea>
              </div>
              
              {error && <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md"><p className="text-red-400 text-sm">{error}</p></div>}
              
              <div className="flex justify-end gap-3 mt-2 border-t border-white/10 pt-4">
                <button type="button" onClick={() => { setEditingProject(null); setPreview(null); }} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
