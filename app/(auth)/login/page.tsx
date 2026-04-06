'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

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
    if (!email) {
      setError('Informe seu email.')
      return
    }
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    setLoading(false)
    if (err) {
      setError('Erro ao enviar link. Tente novamente.')
    } else {
      setMagicSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-[32px] font-light text-text-primary tracking-tight">
            Nina<span className="text-text-tertiary text-[20px]">.AI</span>
          </h1>
          <p className="body-sm text-text-tertiary mt-2">Advisory executivo de RH</p>
        </div>

        {magicSent ? (
          <div className="text-center p-6 bg-success-subtle border border-[var(--success-subtle)] rounded-lg">
            <p className="body-md text-success">
              Link enviado para <strong>{email}</strong>.
              Verifique seu email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            {error && (
              <p className="body-sm text-danger">{error}</p>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                Entrar
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleMagicLink}
                disabled={loading}
                className="w-full text-text-tertiary"
              >
                Entrar com link por email
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
