"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, Eye, Plus, Trash2, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import PageHeader from "../components/page-header"
import { motion } from "framer-motion"

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
    <>
      <PageHeader
        title="Yetenekler"
        description="Yeteneklerinizi düzenleyin"
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

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-none shadow-lg dark:shadow-gray-900/10 bg-white dark:bg-gray-800">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-100 dark:border-gray-700">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> Yetenekler
            </CardTitle>
            <CardDescription>Portfolyonuzda gösterilecek yeteneklerinizi düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Yeni yetenek ekleyin..."
                  className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddSkill()
                    }
                  }}
                />
                <Code className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddSkill}
                className="bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              {skills.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Henüz yetenek eklenmemiş. Yukarıdaki alandan yeni yetenekler ekleyebilirsiniz.
                </div>
              ) : (
                skills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 transition-all duration-300 border border-purple-200 dark:border-purple-800/50"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-1 text-purple-700 dark:text-purple-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))
              )}
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
      </motion.form>
    </>
  )
}
