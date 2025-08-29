"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, TrendingUp, Clock } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()

  const stats = [
    {
      title: "Matérias Ativas",
      value: "8",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Dúvidas Respondidas",
      value: "24",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Progresso Geral",
      value: "78%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Tempo de Estudo",
      value: "12h",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Olá, {user?.name}! 👋</h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Bem-vindo de volta à sua área de estudos
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`${
                isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              } hover:shadow-lg transition-shadow duration-300`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
          <CardHeader>
            <CardTitle className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Matemática", activity: "Completou exercícios de álgebra", time: "2 horas atrás" },
                { subject: "Português", activity: "Tirou dúvida sobre gramática", time: "1 dia atrás" },
                { subject: "História", activity: "Estudou sobre Brasil Colonial", time: "2 dias atrás" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.subject}</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item.activity}</p>
                  </div>
                  <span className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
