import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
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
      <div className="min-h-screen bg-navy-deep flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 bg-bg-base overflow-y-auto">
            <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-8 pb-24 lg:pb-8">
              {children}
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    </EmpresaProvider>
  )
}
