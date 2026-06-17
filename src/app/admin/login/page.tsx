import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
      <div className="bg-[#121212] p-8 rounded-xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage the gallery and featured projects</p>
        </div>
        
        <form className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60" htmlFor="email">Email</label>
            <input
              className="bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60" htmlFor="password">Password</label>
            <input
              className="bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          
          {params?.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-center">
              <p className="text-red-400 text-sm font-medium">
                {params.error}
              </p>
            </div>
          )}

          <button
            formAction={login}
            className="w-full bg-primary text-black font-bold py-3.5 px-4 rounded-md mt-4 hover:bg-white transition-colors tracking-widest uppercase text-sm"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
