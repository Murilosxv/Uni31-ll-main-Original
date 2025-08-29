"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import Link from "next/link"
import { Users } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState<{
    name: string;
    password: string;
    email: string;
    age: string;
    confirmPassword: string;
    level: "fundamental" | "medio" | "professor";
  }>({
    name: "",
    password: "",
    email: "",
    age: "",
    confirmPassword: "",
    level: "medio",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const { signup, isLoading } = useAuth()
  const { isDarkMode } = useTheme()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.age.trim()) {
      newErrors.age = "Idade é obrigatória"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = "Idade deve ser um número válido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail deve ter formato válido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    // 👇 Aqui ajustamos: enviamos `tipo` para o backend
    const success = await signup(
      formData.email,
      formData.password,
      formData.name,
      formData.level, // esse será recebido como "tipo" no backend
      Number(formData.age)
    )

    if (success) {
      setSuccess(true)
        setTimeout(() => {
      router.push("/terms") // sempre vai para a página de termos
    }, 2000)
    } else {
      setErrors({ general: "Erro ao criar conta. Tente novamente." })
    }
  }

  // ------------------------
  // RETORNOS DA TELA
  // ------------------------

  if (success) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
          isDarkMode ? "bg-black" : "bg-gray-50"
        }`}
      >
        <Card className={`w-full max-w-md ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
          <CardContent className="text-center p-8">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Conta criada com sucesso!
            </h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Enviamos um email de confirmação para você. Clique no link para ativar sua conta!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela normal de cadastro
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-gray-50"
      }`}
    >
      <Card className={`w-full max-w-md ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            EduPlataforma
          </CardTitle>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Crie sua conta</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Nome Completo *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={handleInputChange}
                className={`${isDarkMode ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300 text-gray-900"} ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Idade */}
            <div className="space-y-2">
              <Label htmlFor="age" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Idade *
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Digite sua idade"
                value={formData.age}
                onChange={handleInputChange}
                className={`${isDarkMode ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300 text-gray-900"} ${errors.age ? "border-red-500" : ""}`}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                E-mail *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleInputChange}
                className={`${isDarkMode ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300 text-gray-900"} ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Senha *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha (mín. 6 caracteres)"
                value={formData.password}
                onChange={handleInputChange}
                className={`${isDarkMode ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300 text-gray-900"} ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirmar senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Confirmar Senha *
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`${isDarkMode ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400" : "bg-white border-gray-300 text-gray-900"} ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {/* Select nível */}
            <div className="space-y-2">
              <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Nível de Ensino</Label>
              <Select
                value={formData.level}
                onValueChange={(value: "fundamental" | "medio" | "professor") =>
                  setFormData((prev) => ({ ...prev, level: value }))
                }
              >
                <SelectTrigger className={`${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}>
                  <SelectValue placeholder="Selecione seu nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                  <SelectItem value="medio">Ensino Médio</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Erro geral */}
            {errors.general && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-red-700 text-sm text-center">{errors.general}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Criando conta..." : "Concluir Cadastro"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className={`text-sm hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Já tem conta? Entre aqui
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
