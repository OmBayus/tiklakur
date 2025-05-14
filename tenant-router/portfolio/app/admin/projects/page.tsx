"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, Eye, Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
}

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTag, setNewTag] = useState("")
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
          setProjects(data.projects)
        } catch (error) {
          console.warn("Could not fetch data, using fallback data instead:", error)
          // Fallback data if fetch fails
          setProjects([
            {
              title: "E-commerce Platform",
              description: "A full-featured online store with cart, checkout, and payment integration.",
              tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
              image: "/placeholder.svg?height=200&width=400",
            },
            {
              title: "Task Management App",
              description: "A productivity app for teams with real-time updates and collaboration features.",
              tags: ["React", "Firebase", "Material UI"],
              image: "/placeholder.svg?height=200&width=400",
            },
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
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project })
    setIsDialogOpen(true)
  }

  const handleAddProject = () => {
    setEditingProject({
      title: "",
      description: "",
      tags: [],
      image: "/placeholder.svg?height=200&width=400",
    })
    setIsDialogOpen(true)
  }

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...projects]
    updatedProjects.splice(index, 1)
    setProjects(updatedProjects)
  }

  const handleAddTag = () => {
    if (editingProject && newTag.trim() && !editingProject.tags.includes(newTag.trim())) {
      setEditingProject({
        ...editingProject,
        tags: [...editingProject.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        tags: editingProject.tags.filter((t) => t !== tag),
      })
    }
  }

  const handleSaveProject = () => {
    if (editingProject) {
      // Check if we're editing an existing project or adding a new one
      const existingIndex = projects.findIndex((p) => p.title === editingProject.title)

      if (existingIndex >= 0) {
        // Update existing project
        const updatedProjects = [...projects]
        updatedProjects[existingIndex] = editingProject
        setProjects(updatedProjects)
      } else {
        // Add new project
        setProjects([...projects, editingProject])
      }

      setIsDialogOpen(false)
      setEditingProject(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate saving data
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Başarılı!",
        description: "Projeleriniz başarıyla güncellendi.",
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
          <h1 className="text-2xl font-bold">Projeler</h1>
          <p className="text-muted-foreground">Portfolyonuzdaki projeleri düzenleyin</p>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Projeler</CardTitle>
              <CardDescription>Portfolyonuzda gösterilecek projelerinizi düzenleyin</CardDescription>
            </div>
            <Button type="button" onClick={handleAddProject} className="bg-gradient-to-r from-purple-600 to-blue-500">
              <Plus className="mr-2 h-4 w-4" /> Yeni Proje
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Henüz proje eklenmemiş. Yeni bir proje ekleyin.
              </div>
            ) : (
              <div className="grid gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-1/3 h-40 relative">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-2/3 p-4 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                            <Edit className="h-4 w-4 mr-1" /> Düzenle
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveProject(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Sil
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500">
              <Save className="mr-2 h-4 w-4" /> Değişiklikleri Kaydet
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Project Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProject && editingProject.title ? `Projeyi Düzenle: ${editingProject.title}` : "Yeni Proje Ekle"}
            </DialogTitle>
            <DialogDescription>Proje detaylarını düzenleyin ve kaydedin</DialogDescription>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Proje Başlığı</Label>
                <Input
                  id="title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Proje başlığı"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Proje açıklaması"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Görsel URL</Label>
                <Input
                  id="image"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="Proje görseli URL"
                />
                {editingProject.image && (
                  <div className="mt-2 h-32 rounded overflow-hidden">
                    <img
                      src={editingProject.image || "/placeholder.svg"}
                      alt="Proje Önizleme"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Etiketler</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Yeni etiket ekleyin..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {editingProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                      {tag}
                      <button type="button" className="ml-1 hover:text-red-500" onClick={() => handleRemoveTag(tag)}>
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button type="button" onClick={handleSaveProject} className="bg-gradient-to-r from-purple-600 to-blue-500">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
