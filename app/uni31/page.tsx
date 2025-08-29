"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Bot, Settings, X, LogOut, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  title: string
  description: string
  category: string
  status: "todo" | "progress" | "done"
}

const allSubjects = [
  "História",
  "Inglês",
  "Tecnologia",
  "Português",
  "Matemática",
  "Ciências Geral",
  "Redação e Leitura",
  "Educação Financeira",
  "Geografia",
  "Projeto de Vida",
  "Educação Física",
  "Orientação de Estudos – Português",
  "Orientação de Estudos – Matemática",
  "Biologia",
  "Química",
  "Física",
  "Filosofia",
  "Sociologia",
  "Oratória",
  "Liderança",
  "Arte",
  "Biotecnologia",
  "Programação",
  "Carreiras e Mercado de Trabalho",
  "Introdução à Administração",
  "Matemática Aplicada",
  "Empreendedorismo",
  "Química Aplicada",
  "Reuniões",
  "Administrativo",
]

const categories = ["Todas", ...allSubjects]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Reunião de Equipe",
    description: "Discutir o progresso do projeto UNI-31",
    category: "Reuniões",
    status: "todo",
  },
  {
    id: "2",
    title: "Relatório Mensal",
    description: "Preparar relatório de atividades do mês",
    category: "Administrativo",
    status: "progress",
  },
  {
    id: "3",
    title: "Disciplina de Informática",
    description:
      "Valor das questões: 80% para 20% no peso final e 1 questão de bônus no trabalho escolar página 45-46.",
    category: "Matemática",
    status: "done",
  },
]

const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    // Core subjects with consistent colors
    Matemática: "bg-blue-600 text-white border-blue-600",
    "Matemática Aplicada": "bg-blue-600 text-white border-blue-600",
    Português: "bg-purple-600 text-white border-purple-600",
    História: "bg-yellow-600 text-white border-yellow-600",
    Geografia: "bg-green-600 text-white border-green-600",
    Inglês: "bg-red-600 text-white border-red-600",
    "Ciências Geral": "bg-teal-600 text-white border-teal-600",
    Biologia: "bg-emerald-600 text-white border-emerald-600",
    Química: "bg-orange-600 text-white border-orange-600",
    "Química Aplicada": "bg-orange-600 text-white border-orange-600",
    Física: "bg-indigo-600 text-white border-indigo-600",
    Filosofia: "bg-gray-600 text-white border-gray-600",
    Sociologia: "bg-pink-600 text-white border-pink-600",
    Arte: "bg-rose-600 text-white border-rose-600",
    "Educação Física": "bg-lime-600 text-white border-lime-600",
    "Educação Financeira": "bg-amber-600 text-white border-amber-600",
    "Redação e Leitura": "bg-violet-600 text-white border-violet-600",
    "Projeto de Vida": "bg-cyan-600 text-white border-cyan-600",
    "Orientação de Estudos – Português": "bg-purple-500 text-white border-purple-500",
    "Orientação de Estudos – Matemática": "bg-blue-500 text-white border-blue-500",
    Tecnologia: "bg-slate-600 text-white border-slate-600",
    Programação: "bg-slate-700 text-white border-slate-700",
    Biotecnologia: "bg-emerald-700 text-white border-emerald-700",
    Oratória: "bg-red-500 text-white border-red-500",
    Liderança: "bg-yellow-700 text-white border-yellow-700",
    "Carreiras e Mercado de Trabalho": "bg-gray-700 text-white border-gray-700",
    "Introdução à Administração": "bg-blue-700 text-white border-blue-700",
    Empreendedorismo: "bg-green-700 text-white border-green-700",
    // Administrative categories
    Reuniões: "bg-blue-100 text-blue-800 border-blue-200",
    Administrativo: "bg-gray-100 text-gray-800 border-gray-200",
  }

  return colorMap[category] || "bg-gray-100 text-gray-800 border-gray-200"
}

export default function UNI31Page() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomedCard, setZoomedCard] = useState<string | null>(null)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
  })
  const router = useRouter()

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim() && newTask.category) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        category: newTask.category,
        status: "todo",
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", category: "" })
      setIsAddTaskModalOpen(false)
    }
  }

  const moveTask = (taskId: string, newStatus: "todo" | "progress" | "done") => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleEditTask = () => {
    if (editingTask && editingTask.title.trim() && editingTask.description.trim() && editingTask.category) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...editingTask, title: editingTask.title.trim(), description: editingTask.description.trim() }
            : task,
        ),
      )
      setEditingTask(null)
      setIsEditTaskModalOpen(false)
    }
  }

  const openEditModal = (task: Task) => {
    setEditingTask({ ...task })
    setIsEditTaskModalOpen(true)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = selectedCategory === "Todas" || task.category === selectedCategory
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const todoTasks = filteredTasks.filter((task) => task.status === "todo")
  const progressTasks = filteredTasks.filter((task) => task.status === "progress")
  const doneTasks = filteredTasks.filter((task) => task.status === "done")

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const TaskCard = ({ task }: { task: Task }) => {
    const isZoomed = zoomedCard === task.id

    return (
      <Card className="mb-4 hover:shadow-lg transition-all duration-300 h-48 flex flex-col bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-100">
                  <MoreHorizontal className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditModal(task)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                {task.status === "todo" && (
                  <DropdownMenuItem onClick={() => moveTask(task.id, "progress")}>
                    Mover para Em Andamento
                  </DropdownMenuItem>
                )}
                {task.status === "progress" && (
                  <DropdownMenuItem onClick={() => moveTask(task.id, "done")}>Mover para Concluído</DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600 focus:text-red-600">
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-sm font-medium text-gray-900">{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex-1 flex flex-col justify-between">
          <CardDescription className="text-xs text-gray-700 flex-1 overflow-hidden line-clamp-3">
            {task.description}
          </CardDescription>
          <Button
            variant="link"
            className="p-0 h-auto text-xs mt-2 text-blue-600 self-start hover:text-blue-800"
            onClick={() => setZoomedCard(task.id)}
          >
            Detalhes
          </Button>
        </CardContent>
      </Card>
    )
  }

  const Column = ({ title, tasks, count }: { title: string; tasks: Task[]; count: number }) => (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
          Itens {count}
        </Badge>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarVisible(!sidebarVisible)}>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
              </div>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">UNI-31</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative"></div>
            <Button size="sm" className="hover:bg-blue-700 bg-slate-200" onClick={() => setIsAddTaskModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar nova nota ou tarefa...
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 min-h-screen p-6 transition-all duration-300 ${
            sidebarVisible ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="mt-8 mb-6">
            <Button
              onClick={() => router.push("/chatbot")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-md transition-all duration-200"
            >
              <Bot className="h-5 w-5 mr-2" />
              Tirar dúvidas com IA
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">FILTROS</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-red-50 text-red-700 border-l-2 border-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">CONFIGURAÇÕES</h2>
            <Button
              onClick={() => router.push("/settings")}
              variant="ghost"
              className="w-full justify-start text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Dados Pessoais - Alunos
            </Button>
            <Button
              onClick={() => router.push("/settings")}
              variant="ghost"
              className="w-full justify-start text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Dados Pessoais - Admin
            </Button>
            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              className="w-full justify-start text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 mt-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex space-x-6">
            <Column title="Para fazer" tasks={todoTasks} count={todoTasks.length} />
            <Column title="Em andamento" tasks={progressTasks} count={progressTasks.length} />
            <Column title="Concluídos" tasks={doneTasks} count={doneTasks.length} />
          </div>
        </main>
      </div>

      {zoomedCard && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30" onClick={() => setZoomedCard(null)} />

          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            {(() => {
              const task = tasks.find((t) => t.id === zoomedCard)
              if (!task) return null

              return (
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-50 border-2 border-gray-300 rounded-xl shadow-2xl transform scale-105 transition-all duration-300">
                  <CardHeader className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getCategoryColor(task.category)}>
                        {task.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setZoomedCard(null)}
                        className="hover:bg-gray-200 rounded-full"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                      {task.description}
                    </div>
                  </CardContent>
                  <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end rounded-b-xl">
                    <Button
                      onClick={() => setZoomedCard(null)}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    >
                      Fechar
                    </Button>
                  </div>
                </Card>
              )
            })()}
          </div>
        </div>
      )}

      <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
            <DialogDescription>Preencha os campos abaixo para criar uma nova tarefa.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Digite o título da tarefa..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Digite a descrição da tarefa..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">Matérias</div>
                  {allSubjects
                    .filter((subject) => !["Reuniões", "Administrativo"].includes(subject))
                    .map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide mt-2">Outras</div>
                  <SelectItem value="Reuniões">Reuniões</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddTask}
              disabled={!newTask.title.trim() || !newTask.description.trim() || !newTask.category}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Criar Tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditTaskModalOpen} onOpenChange={setIsEditTaskModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
            <DialogDescription>Modifique os campos abaixo para atualizar a tarefa.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Título</Label>
              <Input
                id="edit-title"
                placeholder="Digite o título da tarefa..."
                value={editingTask?.title || ""}
                onChange={(e) => setEditingTask(editingTask ? { ...editingTask, title: e.target.value } : null)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                placeholder="Digite a descrição da tarefa..."
                value={editingTask?.description || ""}
                onChange={(e) => setEditingTask(editingTask ? { ...editingTask, description: e.target.value } : null)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Categoria</Label>
              <Select
                value={editingTask?.category || ""}
                onValueChange={(value) => setEditingTask(editingTask ? { ...editingTask, category: value } : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">Matérias</div>
                  {allSubjects
                    .filter((subject) => !["Reuniões", "Administrativo"].includes(subject))
                    .map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide mt-2">Outras</div>
                  <SelectItem value="Reuniões">Reuniões</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTaskModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEditTask}
              disabled={!editingTask?.title.trim() || !editingTask?.description.trim() || !editingTask?.category}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
