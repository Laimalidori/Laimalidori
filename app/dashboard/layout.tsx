import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { CompanyStrip } from '@/components/layout/CompanyStrip'
import { MobileNav } from '@/components/layout/MobileNav'
import { EmpresaProvider } from '@/components/layout/EmpresaProvider'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
  } catch {
    redirect('/login')
  }

  return (
    <EmpresaProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <CompanyStrip />
        <main className="flex-1 w-full max-w-content mx-auto px-4 md:px-6 py-8 pb-20 md:pb-8">
          {children}
        </main>
        <MobileNav />
      </div>
    </EmpresaProvider>
  )
}
