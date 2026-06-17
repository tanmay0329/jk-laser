'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ loginAction }: { loginAction: (formData: FormData) => void }) {
  const { pending } = useFormStatus()

  return (
    <button
      formAction={loginAction}
      disabled={pending}
      className="w-full bg-primary text-black font-bold py-3.5 px-4 rounded-md mt-4 hover:bg-white transition-colors tracking-widest uppercase text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
          Signing In...
        </>
      ) : (
        'Sign In to Dashboard'
      )}
    </button>
  )
}
