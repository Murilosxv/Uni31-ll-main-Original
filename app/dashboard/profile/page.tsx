"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Mail, User, GraduationCap, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    level: user?.level || "medio",
    phone: "",
    city: "",
    birthDate: "",
    bio: "",
  })

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
    // Show success message
    alert("Perfil atualizado com sucesso!")
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      level: user?.level || "medio",
      phone: "",
      city: "",
      birthDate: "",
      bio: "",
    })
    setIsEditing(false)
  }

  const handleAvatarChange = () => {
    // Here you would typically open a file picker
    alert("Funcionalidade de upload de foto será implementada em breve!")
  }

  const stats = [
    { label: "Matérias Ativas", value: "8", icon: GraduationCap },
    { label: "Dúvidas Respondidas", value: "24", icon: User },
    { label: "Dias de Estudo", value: "45", icon: Calendar },
    { label: "Progresso Médio", value: "78%", icon: GraduationCap },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Perfil</h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="w-24 h-24 border-4 border-purple-500">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                    onClick={handleAvatarChange}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user?.name}</CardTitle>
                <Badge
                  variant="secondary"
                  className={`mx-auto ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                >
                  {user?.level === "fundamental" ? "Ensino Fundamental" : "Ensino Médio"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Estudante ativo desde 2024
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className={`mt-6 ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className={`text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{stat.label}</span>
                    </div>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Informações Pessoais
                </CardTitle>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
                  className={
                    isEditing
                      ? isDarkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  }
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Nome Completo
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    ) : (
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formData.name || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    ) : (
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formData.email || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Nível de Ensino
                    </Label>
                    {isEditing ? (
                      <Select
                        value={formData.level}
                        onValueChange={(value) => setFormData({ ...formData, level: value as "fundamental" | "medio" })}
                      >
                        <SelectTrigger
                          className={`${
                            isDarkMode
                              ? "bg-gray-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                          <SelectItem value="medio">Ensino Médio</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formData.level === "fundamental" ? "Ensino Fundamental" : "Ensino Médio"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Telefone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    ) : (
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formData.phone || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Cidade
                    </Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="São Paulo, SP"
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    ) : (
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formData.city || "Não informado"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Data de Nascimento
                    </Label>
                    {isEditing ? (
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    ) : (
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formData.birthDate || "Não informado"}
                      </p>
                    )}
                  </div>
                </div>

                <Separator className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />

                <div className="space-y-2">
                  <Label htmlFor="bio" className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Sobre mim
                  </Label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Conte um pouco sobre você, seus objetivos de estudo..."
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md resize-none ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      }`}
                    />
                  ) : (
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {formData.bio || "Nenhuma informação adicional fornecida."}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className={`${
                        isDarkMode
                          ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
