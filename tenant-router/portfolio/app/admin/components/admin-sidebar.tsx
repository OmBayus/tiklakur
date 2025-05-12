"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Settings, FileText, Briefcase, Code, LogOut, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const links = [
    { href: "/admin", label: "Kişisel Bilgiler", icon: User },
    { href: "/admin/about", label: "Hakkımda", icon: FileText },
    { href: "/admin/skills", label: "Yetenekler", icon: Code },
    { href: "/admin/projects", label: "Projeler", icon: Briefcase },
    { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white dark:bg-gray-800 w-64 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out h-full flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "fixed md:static z-40",
        )}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Portfolio Admin
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Portfolyo Yönetim Paneli</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md group transition-colors",
                  isActive
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Siteye Dön
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
