'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError('Email ou senha incorretos.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  async function handleMagicLink() {
    if (!email) { setError('Informe seu email.'); return }
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    setLoading(false)
    if (err) setError('Erro ao enviar link. Tente novamente.')
    else setMagicSent(true)
  }

  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center px-4">
      {/* Glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-baseline justify-center gap-0.5 mb-2">
            <span className="font-serif font-light text-[36px] text-white tracking-tight">Amplif</span>
            <span className="font-sans font-light text-[18px] text-pink">.AI</span>
          </div>
          <p className="font-sans text-[13px] text-white/40">Advisory executivo de RH</p>
        </div>

        {magicSent ? (
          <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl">
            <p className="font-sans text-[13px] text-white/70">
              Link enviado para <span className="text-white font-medium">{email}</span>.
              Verifique seu email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-medium tracking-widest uppercase text-white/40">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                required
                className="w-full h-10 bg-white/5 border border-white/12 rounded-lg px-4 font-sans text-[13px] text-white placeholder-white/25 outline-none focus:border-pink/50 focus:bg-white/8 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-medium tracking-widest uppercase text-white/40">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full h-10 bg-white/5 border border-white/12 rounded-lg px-4 font-sans text-[13px] text-white placeholder-white/25 outline-none focus:border-pink/50 focus:bg-white/8 transition-all"
              />
            </div>

            {error && (
              <p className="font-sans text-[12px] text-red-400">{error}</p>
            )}

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="h-10 w-full rounded-lg bg-gradient-to-r from-pink to-pink-glow font-sans text-[13px] font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Entrando…' : 'Entrar'}
              </button>
              <button
                type="button"
                onClick={handleMagicLink}
                disabled={loading}
                className="h-10 w-full rounded-lg border border-white/10 font-sans text-[13px] text-white/50 hover:text-white/70 hover:bg-white/5 transition-all disabled:opacity-40"
              >
                Entrar com link por email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
