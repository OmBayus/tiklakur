"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, Eye, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type Stat = {
  value: string
  label: string
}

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [paragraphs, setParagraphs] = useState<string[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [newParagraph, setNewParagraph] = useState("")
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
          setParagraphs(data.about.paragraphs)
          setStats(data.about.stats)
        } catch (error) {
          console.warn("Could not fetch data, using fallback data instead:", error)
          // Fallback data if fetch fails
          setParagraphs([
            "I'm a passionate Frontend Developer with 5+ years of experience creating responsive, user-friendly web applications. I specialize in React, Next.js, and modern CSS frameworks.",
            "My journey in web development started at University of Technology where I earned my Bachelor's degree in Computer Science. Since then, I've worked with startups and established companies to build products that users love.",
          ])
          setStats([
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "20+", label: "Happy Clients" },
            { value: "10+", label: "Technologies" },
          ])
        }
      } catch (error) {
        console.error("Error in data handling:", error)
        toast({
          title: "Uyarı",
          description: "Varsayılan veriler kullanılıyor.",
          variant: "destructive",
        })
        // Ensure we have at least empty data
        setParagraphs([])
        setStats([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleParagraphChange = (index: number, value: string) => {
    const updatedParagraphs = [...paragraphs]
    updatedParagraphs[index] = value
    setParagraphs(updatedParagraphs)
  }

  const handleAddParagraph = () => {
    if (newParagraph.trim()) {
      setParagraphs([...paragraphs, newParagraph])
      setNewParagraph("")
    }
  }

  const handleRemoveParagraph = (index: number) => {
    const updatedParagraphs = [...paragraphs]
    updatedParagraphs.splice(index, 1)
    setParagraphs(updatedParagraphs)
  }

  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    const updatedStats = [...stats]
    updatedStats[index] = { ...updatedStats[index], [field]: value }
    setStats(updatedStats)
  }

  const handleAddStat = () => {
    setStats([...stats, { value: "", label: "" }])
  }

  const handleRemoveStat = (index: number) => {
    const updatedStats = [...stats]
    updatedStats.splice(index, 1)
    setStats(updatedStats)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate saving data
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Başarılı!",
        description: "Hakkımda bilgileriniz başarıyla güncellendi.",
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
          <h1 className="text-2xl font-bold">Hakkımda</h1>
          <p className="text-muted-foreground">Hakkınızda bölümünü düzenleyin</p>
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
            <CardTitle>Hakkımda Paragrafları</CardTitle>
            <CardDescription>Kendinizi tanıtan paragrafları düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  placeholder={`Paragraf ${index + 1}`}
                  rows={3}
                  className="flex-1"
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveParagraph(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="flex gap-2">
              <Textarea
                value={newParagraph}
                onChange={(e) => setNewParagraph(e.target.value)}
                placeholder="Yeni paragraf ekleyin..."
                rows={3}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handleAddParagraph}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>İstatistikler</CardTitle>
            <CardDescription>Hakkımda bölümünde gösterilecek istatistikleri düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="space-y-2 flex-1">
                  <Label>Değer</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, "value", e.target.value)}
                    placeholder="Örn: 5+"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Etiket</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, "label", e.target.value)}
                    placeholder="Örn: Yıl Deneyim"
                  />
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveStat(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={handleAddStat} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Yeni İstatistik Ekle
            </Button>
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
