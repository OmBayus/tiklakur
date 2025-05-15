"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Hata",
        description: "Şifreler eşleşmiyor.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Hata",
        description: "Şifre en az 8 karakter olmalıdır.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/reset-password/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password })
      });

      if (!response.ok) {
        throw new Error('Şifre sıfırlama işlemi başarısız oldu');
      }

      toast({
        title: "Şifre güncellendi",
        description: "Şifreniz başarıyla güncellendi. Şimdi giriş yapabilirsiniz.",
        variant: "default",
      })

      // Başarılı olduğunda giriş sayfasına yönlendir
      setTimeout(() => {
        router.push("/auth")
      }, 2000)
    } catch (error: unknown) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Şifre sıfırlama işlemi başarısız oldu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/auth" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Giriş sayfasına dön
          </Link>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Şifre Sıfırlama</h1>
            <p className="mt-2 text-sm text-gray-600">Lütfen yeni şifrenizi belirleyin</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                Yeni Şifre
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-900">
                Şifreyi Onayla
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "İşleniyor..." : "Şifreyi Sıfırla"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
