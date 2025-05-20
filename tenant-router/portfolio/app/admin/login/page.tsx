"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lock, User, ArrowRight } from "lucide-react"
import { ThemeToggle } from "../components/theme-toggle"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // In a real app, you would validate credentials against an API
      if (username === "admin" && password === "password") {
        toast({
          title: "Giriş Başarılı",
          description: "Yönetim paneline yönlendiriliyorsunuz.",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Giriş Başarısız",
          description: "Kullanıcı adı veya şifre hatalı.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden border-none shadow-xl dark:shadow-gray-900/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <CardHeader className="space-y-1 text-center pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardTitle className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  Portfolio Admin
                </span>
              </CardTitle>
              <CardDescription className="text-center">Portfolyo yönetim paneline giriş yapın</CardDescription>
            </motion.div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Label htmlFor="username" className="text-sm font-medium">
                  Kullanıcı Adı
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Kullanıcı adınız"
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </motion.div>
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Şifre
                  </Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Şifremi Unuttum
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            </CardContent>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <CardFooter className="pb-8">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Giriş Yapılıyor..."
                  ) : (
                    <>
                      Giriş Yap
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </motion.div>
          </form>
          <div className="p-4 text-center text-sm text-muted-foreground border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <p>
              Demo için: kullanıcı adı: <strong>admin</strong>, şifre: <strong>password</strong>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
