"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Settings, FileText, Briefcase, Code, LogOut, ChevronRight, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const { resolvedTheme } = useTheme()
  const [userData, setUserData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  })

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data.json")
        if (response.ok) {
          const data = await response.json()
          if (data.personal) {
            setUserData({
              name: data.personal.name || "Admin User",
              email: data.personal.email || "admin@example.com",
              avatar: data.personal.profileImage || "/placeholder.svg?height=40&width=40",
            })
          }
        }
      } catch (error) {
        console.warn("Could not fetch user data:", error)
      }
    }

    fetchUserData()
  }, [])

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
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "bg-white dark:bg-gray-800 w-72 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col",
          "fixed md:static z-40 shadow-lg dark:shadow-gray-900/30",
        )}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Avatar className="w-20 h-20 border-4 border-white dark:border-gray-800 relative z-10">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xl">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            {userData.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{userData.email}</p>

          <div className="flex items-center justify-center mt-4 w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {resolvedTheme === "dark" ? "Karanlık" : "Aydınlık"} Mod
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Yönetim
            </h3>
          </div>

          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "text-white font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 -z-10"
                    initial={{ borderRadius: 8 }}
                    animate={{ borderRadius: 8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive ? "text-white" : "text-primary dark:text-primary/80",
                    !isActive && "group-hover:scale-110",
                  )}
                />
                <span>{link.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto text-white" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-primary/10 transition-colors duration-200"
            >
              <Home className="h-4 w-4 text-primary" />
              Siteye Dön
            </Button>
          </Link>
          <Link href="/admin/login" className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </Button>
          </Link>
        </div>
      </motion.div>
    </>
  )
}
