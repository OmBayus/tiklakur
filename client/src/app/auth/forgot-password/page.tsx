"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

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
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-black mb-2">Şifremi Unuttum</h1>
          <p className="text-gray-600 mb-6">Şifrenizi sıfırlamak için e-posta adresinizi girin</p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  E-posta
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#111827] hover:bg-black text-white font-medium rounded-md transition-colors cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
              </button>

              <div className="text-center">
                <Link href="/auth" className="text-sm text-black hover:underline">
                  Giriş sayfasına dön
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-black">
                Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. Lütfen e-postanızı kontrol
                edin.
              </p>
              <button
                onClick={() => {
                  setEmail("")
                  setIsSubmitted(false)
                }}
                className="w-full py-3 bg-[#111827] hover:bg-black text-white font-medium rounded-md transition-colors cursor-pointer"
              >
                Farklı bir e-posta adresi dene
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
