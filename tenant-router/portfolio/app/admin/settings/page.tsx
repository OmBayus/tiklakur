"use client"

import type React from "react"

import { useState } from "react"
import { Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    darkMode: false,
    animations: true,
    autoSave: false,
    notifications: true,
  })
  const { toast } = useToast()

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate saving data
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Başarılı!",
        description: "Ayarlarınız başarıyla güncellendi.",
      })
    }, 1000)
  }

  const handleReset = () => {
    setSettings({
      darkMode: false,
      animations: true,
      autoSave: false,
      notifications: true,
    })

    toast({
      title: "Sıfırlandı",
      description: "Ayarlar varsayılan değerlere sıfırlandı.",
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
          <p className="text-muted-foreground">Yönetim paneli ayarlarını düzenleyin</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" /> Sıfırla
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-500">
            <Save className="mr-2 h-4 w-4" /> Kaydet
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Genel Ayarlar</CardTitle>
            <CardDescription>Yönetim paneli için genel ayarları düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Karanlık Mod</Label>
                <p className="text-sm text-muted-foreground">Yönetim panelini karanlık modda görüntüleyin</p>
              </div>
              <Switch id="darkMode" checked={settings.darkMode} onCheckedChange={() => handleToggle("darkMode")} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">Animasyonlar</Label>
                <p className="text-sm text-muted-foreground">
                  Arayüz animasyonlarını etkinleştirin veya devre dışı bırakın
                </p>
              </div>
              <Switch
                id="animations"
                checked={settings.animations}
                onCheckedChange={() => handleToggle("animations")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoSave">Otomatik Kaydetme</Label>
                <p className="text-sm text-muted-foreground">Değişiklikleri otomatik olarak kaydedin</p>
              </div>
              <Switch id="autoSave" checked={settings.autoSave} onCheckedChange={() => handleToggle("autoSave")} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Bildirimler</Label>
                <p className="text-sm text-muted-foreground">
                  Sistem bildirimlerini etkinleştirin veya devre dışı bırakın
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={() => handleToggle("notifications")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500">
              <Save className="mr-2 h-4 w-4" /> Ayarları Kaydet
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
