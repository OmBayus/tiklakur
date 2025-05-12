"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <Card className="w-full max-w-md border-purple-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-purple-900">Şifremi Unuttum</CardTitle>
          <CardDescription className="text-purple-700">
            E-posta adresinizi girin ve şifre sıfırlama bağlantısı alın
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-900">
                  E-posta
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@mail.com"
                    className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  "Şifre Sıfırlama Bağlantısı Gönder"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="rounded-full bg-purple-100 p-3 mx-auto w-fit">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-purple-900">
                Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. Lütfen e-postanızı kontrol
                edin.
              </p>
              <Button
                onClick={() => {
                  setEmail("")
                  setIsSubmitted(false)
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Farklı bir e-posta adresi dene
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link
            href="/login"
            className="flex w-full items-center justify-center text-sm text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Giriş sayfasına dön
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
