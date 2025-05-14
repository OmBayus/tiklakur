import type { ReactNode } from "react"
import AdminSidebar from "./components/admin-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex h-screen">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-5xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
