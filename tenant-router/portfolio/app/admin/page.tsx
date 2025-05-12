"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Kişisel Bilgiler</h1>
          <p className="text-muted-foreground">Portfolyo kişisel bilgilerinizi düzenleyin</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" /> Önizle
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-500">
            <Save className="mr-2 h-4 w-4" /> Kaydet
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
            <CardDescription>Portfolyonuzda görünecek temel bilgilerinizi düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">İsim</Label>
                <Input id="name" name="name" value={personalInfo.name} onChange={handleChange} placeholder="İsminiz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Ünvan</Label>
                <Input
                  id="title"
                  name="title"
                  value={personalInfo.title}
                  onChange={handleChange}
                  placeholder="Ünvanınız (örn. Frontend Developer)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Kısa Biyografi</Label>
              <Textarea
                id="bio"
                name="bio"
                value={personalInfo.bio}
                onChange={handleChange}
                placeholder="Kendinizi kısaca tanıtın"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profil Resmi URL</Label>
              <Input
                id="profileImage"
                name="profileImage"
                value={personalInfo.profileImage}
                onChange={handleChange}
                placeholder="Profil resminizin URL'si"
              />
              {personalInfo.profileImage && (
                <div className="mt-2 flex justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                    <img
                      src={personalInfo.profileImage || "/placeholder.svg"}
                      alt="Profil Önizleme"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
            <CardDescription>İletişim bilgilerinizi düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={personalInfo.github}
                onChange={handleChange}
                placeholder="GitHub kullanıcı adınız"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={personalInfo.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn profiliniz"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500">
              <Save className="mr-2 h-4 w-4" /> Değişiklikleri Kaydet
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
