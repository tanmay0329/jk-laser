'use client'

import { useState } from 'react'
import { Save, BarChart3, CheckCircle2 } from 'lucide-react'
import { updateStats } from './actions'

export interface CompanyStats {
  designs_count: number
  projects_count: number
  clients_count: number
  experience_years: number
}

export default function StatsAdminClient({ initialStats }: { initialStats: CompanyStats }) {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSave(formData: FormData) {
    setIsLoading(true)
    setError('')
    setSuccess(false)
    
    const result = await updateStats(formData)
    
    setIsLoading(false)
    if (result.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(result.message || 'Failed to update statistics')
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
          <BarChart3 size={24} />
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Business Statistics</h1>
          <p className="text-muted-foreground mt-1">Manage the numbers shown on the homepage.</p>
        </div>
      </div>
      
      <div className="bg-[#121212] border border-white/10 rounded-xl p-6 md:p-8">
        <form action={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Designs */}
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest text-white/70 uppercase">
                Designs Created
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  name="designs_count" 
                  defaultValue={initialStats?.designs_count ?? 350}
                  required 
                  min="0"
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-xl" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">+</span>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest text-white/70 uppercase">
                Projects Completed
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  name="projects_count" 
                  defaultValue={initialStats?.projects_count ?? 150}
                  required 
                  min="0"
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-xl" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">+</span>
              </div>
            </div>

            {/* Clients */}
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest text-white/70 uppercase">
                Happy Clients
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  name="clients_count" 
                  defaultValue={initialStats?.clients_count ?? 120}
                  required 
                  min="0"
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-xl" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">+</span>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest text-white/70 uppercase">
                Years Experience
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  name="experience_years" 
                  defaultValue={initialStats?.experience_years ?? 5}
                  required 
                  min="0"
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-xl" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">+</span>
              </div>
            </div>

          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              {success && (
                <span className="flex items-center gap-2 text-green-400 text-sm font-medium animate-pulse">
                  <CheckCircle2 size={16} /> Saved Successfully
                </span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
              className="bg-primary text-black font-bold px-8 py-3 rounded-md hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={18} />
              {isLoading ? 'Saving...' : 'Save Statistics'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
