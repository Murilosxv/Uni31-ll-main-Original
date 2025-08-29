"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"

export default function ConfirmEmailPage() {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    if (!user) return
    setLoading(true)

    // Redireciona baseado no level do usuário
    if (user.level === "professor") {
      router.push("/uni31")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-gray-50"
      }`}
    >
      <Card className={`w-full max-w-md ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
        <CardContent className="text-center p-8">
          <div className="text-blue-500 text-6xl mb-4">📧</div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Confirme para continuar
          </h2>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
            Clique no botão abaixo para acessar sua área de estudos
          </p>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {loading ? "Redirecionando..." : "Confirmar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
