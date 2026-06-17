'use client'

import { useFormStatus } from 'react-dom'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></span>
          <span className="font-bold text-sm uppercase tracking-wider">Signing Out...</span>
        </>
      ) : (
        <>
          <LogOut size={16} />
          <span className="font-bold text-sm uppercase tracking-wider">Sign Out</span>
        </>
      )}
    </button>
  )
}
