"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Palette, HelpCircle, LogOut } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    study: true,
    progress: true,
  })

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
      logout()
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Configurações</h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Personalize sua experiência na plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance Settings */}
          <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Palette className="h-5 w-5" />
                <span>Aparência</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Modo Escuro</Label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    Alterne entre tema claro e escuro
                  </p>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
              </div>
              <Separator className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
              <div className="space-y-2">
                <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Idioma</Label>
                <Select defaultValue="pt-br">
                  <SelectTrigger
                    className={`${
                      isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Bell className="h-5 w-5" />
                <span>Notificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Email</Label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    Receber notificações por email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Push</Label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    Notificações no navegador
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Lembretes de Estudo</Label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>Lembretes para estudar</p>
                </div>
                <Switch
                  checked={notifications.study}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, study: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Progresso</Label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    Atualizações de progresso
                  </p>
                </div>
                <Switch
                  checked={notifications.progress}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, progress: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Shield className="h-5 w-5" />
                <span>Privacidade e Segurança</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className={`w-full justify-start ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Alterar Senha
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Configurações de Privacidade
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Baixar Meus Dados
              </Button>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <HelpCircle className="h-5 w-5" />
                <span>Ajuda e Suporte</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className={`w-full justify-start ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Central de Ajuda
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Contatar Suporte
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Reportar Problema
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className={`border-red-200 ${isDarkMode ? "bg-gray-900 border-red-800" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Sair da Conta</Label>
                <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                  Desconectar da sua conta atual
                </p>
              </div>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
            <Separator className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Excluir Conta</Label>
                <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                  Excluir permanentemente sua conta
                </p>
              </div>
              <Button variant="destructive" onClick={() => alert("Funcionalidade será implementada em breve")}>
                Excluir Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
