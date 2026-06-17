import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Image as ImageIcon, LayoutTemplate } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Fetch some quick stats
  const { count: galleryCount } = await supabase
    .from('gallery_designs')
    .select('*', { count: 'exact', head: true })
    
  const { count: featuredCount } = await supabase
    .from('featured_projects')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="p-8 md:p-12">
      <h1 className="font-heading text-3xl font-bold text-white mb-2">Welcome to Admin Dashboard</h1>
      <p className="text-muted-foreground mb-12">Manage your website content, gallery, and featured projects.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Gallery Card */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <ImageIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Design Gallery</h2>
              <p className="text-sm text-muted-foreground">{galleryCount ?? 0} total designs</p>
            </div>
          </div>
          <p className="text-white/70 text-sm mb-6 flex-1">
            Upload new laser cut designs, categorize them, and manage the gallery shown to customers.
          </p>
          <Link 
            href="/admin/gallery" 
            className="w-full text-center bg-white/5 hover:bg-primary hover:text-black border border-white/10 text-white font-medium py-2.5 rounded-md transition-colors"
          >
            Manage Gallery
          </Link>
        </div>

        {/* Featured Card */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <LayoutTemplate size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Featured Projects</h2>
              <p className="text-sm text-muted-foreground">{featuredCount ?? 0} active features</p>
            </div>
          </div>
          <p className="text-white/70 text-sm mb-6 flex-1">
            Update the 4 highlighted projects on the homepage. Add stunning transformation photos and descriptions.
          </p>
          <Link 
            href="/admin/featured" 
            className="w-full text-center bg-white/5 hover:bg-primary hover:text-black border border-white/10 text-white font-medium py-2.5 rounded-md transition-colors"
          >
            Manage Featured
          </Link>
        </div>
      </div>
    </div>
  )
}
