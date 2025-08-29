"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp } from "lucide-react"

interface Subject {
  id: string
  name: string
  description: string
  color: string
  bgColor: string
  textColor: string
  level: "fundamental" | "medio" | "both"
  students: number
  lessons: number
  progress: number
}

export default function SubjectsPage() {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const [selectedLevel, setSelectedLevel] = useState<"fundamental" | "medio" | "all">(user?.level || "medio")

  const subjects: Subject[] = [
    {
      id: "matematica",
      name: "Matemática",
      description: "Álgebra, geometria, estatística e mais",
      color: "border-blue-800",
      bgColor: "bg-blue-800",
      textColor: "text-blue-800",
      level: "both",
      students: 1250,
      lessons: 45,
      progress: 78,
    },
    {
      id: "portugues",
      name: "Português",
      description: "Gramática, literatura e redação",
      color: "border-purple-600",
      bgColor: "bg-purple-600",
      textColor: "text-purple-600",
      level: "both",
      students: 1180,
      lessons: 38,
      progress: 65,
    },
    {
      id: "historia",
      name: "História",
      description: "História do Brasil e mundial",
      color: "border-yellow-600",
      bgColor: "bg-yellow-600",
      textColor: "text-yellow-600",
      level: "both",
      students: 890,
      lessons: 32,
      progress: 45,
    },
    {
      id: "ciencias",
      name: "Ciências",
      description: "Biologia, física e química básica",
      color: "border-green-600",
      bgColor: "bg-green-600",
      textColor: "text-green-600",
      level: "fundamental",
      students: 750,
      lessons: 28,
      progress: 82,
    },
    {
      id: "ingles",
      name: "Inglês",
      description: "Conversação, gramática e vocabulário",
      color: "border-blue-400",
      bgColor: "bg-blue-400",
      textColor: "text-blue-400",
      level: "both",
      students: 920,
      lessons: 35,
      progress: 55,
    },
    {
      id: "geografia",
      name: "Geografia",
      description: "Geografia física e humana",
      color: "border-green-800",
      bgColor: "bg-green-800",
      textColor: "text-green-800",
      level: "both",
      students: 680,
      lessons: 30,
      progress: 38,
    },
    {
      id: "redacao",
      name: "Redação",
      description: "Técnicas de escrita e dissertação",
      color: "border-purple-400",
      bgColor: "bg-purple-400",
      textColor: "text-purple-400",
      level: "both",
      students: 540,
      lessons: 25,
      progress: 72,
    },
    {
      id: "filosofia",
      name: "Filosofia",
      description: "Pensamento crítico e ética",
      color: "border-indigo-600",
      bgColor: "bg-indigo-600",
      textColor: "text-indigo-600",
      level: "medio",
      students: 420,
      lessons: 22,
      progress: 28,
    },
    {
      id: "quimica",
      name: "Química",
      description: "Química orgânica e inorgânica",
      color: "border-orange-600",
      bgColor: "bg-orange-600",
      textColor: "text-orange-600",
      level: "medio",
      students: 380,
      lessons: 40,
      progress: 62,
    },
    {
      id: "fisica",
      name: "Física",
      description: "Mecânica, termodinâmica e óptica",
      color: "border-red-600",
      bgColor: "bg-red-600",
      textColor: "text-red-600",
      level: "medio",
      students: 350,
      lessons: 42,
      progress: 48,
    },
    {
      id: "biologia",
      name: "Biologia",
      description: "Genética, ecologia e anatomia",
      color: "border-emerald-600",
      bgColor: "bg-emerald-600",
      textColor: "text-emerald-600",
      level: "medio",
      students: 460,
      lessons: 36,
      progress: 58,
    },
    {
      id: "sociologia",
      name: "Sociologia",
      description: "Sociedade, cultura e política",
      color: "border-pink-600",
      bgColor: "bg-pink-600",
      textColor: "text-pink-600",
      level: "medio",
      students: 290,
      lessons: 20,
      progress: 35,
    },
  ]

  const filteredSubjects = subjects.filter((subject) => {
    if (selectedLevel === "all") return true
    return subject.level === selectedLevel || subject.level === "both"
  })

  const levelOptions = [
    { value: "all", label: "Todas as Matérias" },
    { value: "fundamental", label: "Ensino Fundamental" },
    { value: "medio", label: "Ensino Médio" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Matérias</h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Explore suas disciplinas e conteúdos de estudo
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {levelOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedLevel === option.value ? "default" : "outline"}
              onClick={() => setSelectedLevel(option.value as "fundamental" | "medio" | "all")}
              className={
                selectedLevel === option.value
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject) => (
            <Card
              key={subject.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              } ${subject.color} border-l-4`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${subject.bgColor} bg-opacity-10`}>
                    <BookOpen className={`h-6 w-6 ${subject.textColor}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                  >
                    {subject.level === "fundamental" ? "Fund." : subject.level === "medio" ? "Médio" : "Ambos"}
                  </Badge>
                </div>
                <CardTitle className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {subject.name}
                </CardTitle>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{subject.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Progresso
                    </span>
                    <span className={`text-sm font-bold ${subject.textColor}`}>{subject.progress}%</span>
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? "bg-gray-700" : ""}`}>
                    <div
                      className={`h-2 rounded-full ${subject.bgColor} transition-all duration-300`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className={`flex items-center justify-center mb-1`}>
                      <Users className={`h-3 w-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    </div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {subject.students}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>alunos</p>
                  </div>
                  <div>
                    <div className={`flex items-center justify-center mb-1`}>
                      <BookOpen className={`h-3 w-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    </div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {subject.lessons}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>aulas</p>
                  </div>
                  <div>
                    <div className={`flex items-center justify-center mb-1`}>
                      <TrendingUp className={`h-3 w-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    </div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {Math.floor(subject.progress / 10)}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>nível</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full ${subject.bgColor} hover:opacity-90 text-white transition-all duration-300`}
                  size="sm"
                >
                  Estudar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
            <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Nenhuma matéria encontrada
            </h3>
            <p className={`${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>Tente selecionar um filtro diferente</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
