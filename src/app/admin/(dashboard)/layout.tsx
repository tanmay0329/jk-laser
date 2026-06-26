import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { logout } from '../login/actions'
import { LayoutDashboard, Image as ImageIcon, LayoutTemplate, Star, MonitorPlay, BarChart3, FolderTree } from 'lucide-react'
import { LogoutButton } from './LogoutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#121212] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="font-heading text-2xl font-bold text-white tracking-widest">
            JK <span className="text-primary">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <LayoutDashboard size={18} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <ImageIcon size={18} />
            <span className="font-medium text-sm">Design Gallery</span>
          </Link>
          <Link href="/admin/featured" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <LayoutTemplate size={18} />
            <span className="font-medium text-sm">Featured Projects</span>
          </Link>
          <Link href="/admin/catalogs" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <FolderTree size={18} />
            <span className="font-medium text-sm">Catalogs (Categories)</span>
          </Link>
          <Link href="/admin/hero" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <MonitorPlay size={18} />
            <span className="font-medium text-sm">Hero Slider</span>
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <Star size={18} />
            <span className="font-medium text-sm">Testimonials</span>
          </Link>
          <Link href="/admin/stats" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <BarChart3 size={18} />
            <span className="font-medium text-sm">Statistics</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10 mt-auto">
          {user && (
            <div className="mb-4 px-4">
              <p className="text-xs text-white/50 truncate">Logged in as:</p>
              <p className="text-sm text-white truncate font-medium">{user.email}</p>
            </div>
          )}
          <form action={logout}>
            <LogoutButton />
          </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  )
}
