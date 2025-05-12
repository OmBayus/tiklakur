"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, Eye, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function SkillsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
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
          setSkills(data.skills)
        } catch (error) {
          console.warn("Could not fetch data, using fallback data instead:", error)
          // Fallback data if fetch fails
          setSkills(["JavaScript", "TypeScript", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Node.js"])
        }
      } catch (error) {
        console.error("Error in data handling:", error)
        toast({
          title: "Uyarı",
          description: "Varsayılan veriler kullanılıyor.",
          variant: "destructive",
        })
        // Ensure we have at least empty data
        setSkills([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    } else if (skills.includes(newSkill.trim())) {
      toast({
        title: "Uyarı",
        description: "Bu yetenek zaten eklenmiş.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate saving data
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Başarılı!",
        description: "Yetenekleriniz başarıyla güncellendi.",
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
          <h1 className="text-2xl font-bold">Yetenekler</h1>
          <p className="text-muted-foreground">Yeteneklerinizi düzenleyin</p>
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
            <CardTitle>Yetenekler</CardTitle>
            <CardDescription>Portfolyonuzda gösterilecek yeteneklerinizi düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Yeni yetenek ekleyin..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddSkill()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-1 text-purple-700 dark:text-purple-300 hover:text-red-500 dark:hover:text-red-400"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
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
