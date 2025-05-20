"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, Eye, User, Mail, Github, Linkedin, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import PageHeader from "./components/page-header"
import { motion } from "framer-motion"

export default function PersonalInfoPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    profileImage: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Try to fetch data, but handle the case where it might fail
        try {
          const response = await fetch("/data.json")
          if (!response.ok) throw new Error("Failed to fetch data")
          const data = await response.json()
          setPersonalInfo(data.personal)
        } catch (error) {
          console.warn("Could not fetch data, using fallback data instead:", error)
          // Fallback data if fetch fails
          setPersonalInfo({
            name: "John Doe",
            title: "Frontend Developer",
            bio: "Frontend Developer specializing in building exceptional digital experiences",
            email: "john.doe@example.com",
            github: "github.com/johndoe",
            linkedin: "linkedin.com/in/johndoe",
            profileImage: "/placeholder.svg?height=320&width=320",
          })
        }
      } catch (error) {
        console.error("Error in data handling:", error)
        toast({
          title: "Uyarı",
          description: "Varsayılan veriler kullanılıyor.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate saving data
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Başarılı!",
        description: "Kişisel bilgileriniz başarıyla güncellendi.",
      })
    }, 1000)
  }

  const handlePreview = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <PageHeader
        title="Kişisel Bilgiler"
        description="Portfolyo kişisel bilgilerinizi düzenleyin"
        actions={
          <>
            <Button variant="outline" onClick={handlePreview} className="gap-2">
              <Eye className="h-4 w-4" /> Önizle
            </Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-500 gap-2">
              <Save className="h-4 w-4" /> Kaydet
            </Button>
          </>
        }
      />

      <motion.form onSubmit={handleSubmit} variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-none shadow-lg dark:shadow-gray-900/10 bg-white dark:bg-gray-800 mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Temel Bilgiler
              </CardTitle>
              <CardDescription>Portfolyonuzda görünecek temel bilgilerinizi düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    İsim
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={personalInfo.name}
                      onChange={handleChange}
                      placeholder="İsminiz"
                      className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Ünvan
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={personalInfo.title}
                    onChange={handleChange}
                    placeholder="Ünvanınız (örn. Frontend Developer)"
                    className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Kısa Biyografi
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={personalInfo.bio}
                  onChange={handleChange}
                  placeholder="Kendinizi kısaca tanıtın"
                  rows={3}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage" className="text-sm font-medium">
                  Profil Resmi URL
                </Label>
                <div className="relative">
                  <Input
                    id="profileImage"
                    name="profileImage"
                    value={personalInfo.profileImage}
                    onChange={handleChange}
                    placeholder="Profil resminizin URL'si"
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {personalInfo.profileImage && (
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                      <img
                        src={personalInfo.profileImage || "/placeholder.svg"}
                        alt="Profil Önizleme"
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-none shadow-lg dark:shadow-gray-900/10 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> İletişim Bilgileri
              </CardTitle>
              <CardDescription>İletişim bilgilerinizi düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-posta
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    placeholder="E-posta adresiniz"
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="text-sm font-medium">
                  GitHub
                </Label>
                <div className="relative">
                  <Input
                    id="github"
                    name="github"
                    value={personalInfo.github}
                    onChange={handleChange}
                    placeholder="GitHub kullanıcı adınız"
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Github className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-sm font-medium">
                  LinkedIn
                </Label>
                <div className="relative">
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={personalInfo.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn profiliniz"
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Linkedin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 border-t border-gray-100 dark:border-gray-700 px-6 py-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Save className="mr-2 h-4 w-4" /> Değişiklikleri Kaydet
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.form>
    </>
  )
}
