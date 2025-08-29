"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const { isDarkMode } = useTheme()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    // 🔹 login retorna um objeto User | null
    const user = await login(email, password)

    if (user) {
      // Redireciona direto para a tela certa
      router.push(user.level === "professor" ? "/uni31" : "/dashboard")
    } else {
      setError("Email ou senha incorretos")
    }
  }
  
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-gray-50"
      }`}
    >
      <Card
        className={`w-full max-w-md ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader className="text-center">
          <CardTitle
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            EduPlataforma
          </CardTitle>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Entre na sua conta
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              href="/signup"
              className={`text-sm hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Não tem conta? Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
