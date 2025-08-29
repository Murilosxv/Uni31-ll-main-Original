"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, User, Settings, Menu, X, Sun, Moon, LogOut } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Redirect if not authenticated
    useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Início", href: "/dashboard", icon: Home },
    { name: "Matérias", href: "/dashboard/subjects", icon: BookOpen },
    { name: "Perfil", href: "/dashboard/profile", icon: User },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-gray-50"}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "w-16" : "w-64"} ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        } border-r`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed && (
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>EduPlataforma</h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center">
              <Avatar className="w-12 h-12 border-3 border-purple-500 shadow-lg">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt="Perfil do usuário" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full mx-auto ${user.level === "fundamental" ? "bg-green-500" : "bg-blue-500"}`}
                  ></div>
                  <p className={`text-xs text-center mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {user.level === "fundamental" ? "Fundamental" : "Médio"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="h-5 w-5" />
                  {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={toggleTheme}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {!sidebarCollapsed && <span className="ml-3">Tema</span>}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Sair</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        {/* Top bar for mobile */}
        <div
          className={`lg:hidden ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-b`}
        >
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>EduPlataforma</h1>
            <Avatar className="w-10 h-10 border-2 border-purple-500 shadow-md">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt="Perfil do usuário" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
