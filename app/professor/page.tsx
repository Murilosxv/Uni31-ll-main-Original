"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  X,
  Bot,
  Settings,
  LogOut,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "todo" | "progress" | "done";
};

const allSubjects = [ "História","Inglês","Tecnologia","Português","Matemática","Ciências Geral","Redação e Leitura","Educação Financeira","Geografia","Projeto de Vida","Educação Física","Biologia","Química","Física","Filosofia","Sociologia","Oratória","Liderança","Arte","Biotecnologia","Programação","Carreiras e Mercado de Trabalho","Introdução à Administração","Matemática Aplicada","Empreendedorismo","Química Aplicada","Reuniões","Administrativo", ];
const categories = ["Todas", ...allSubjects];

const initialTasks: Task[] = [
  { id: "1", title: "Reunião de Equipe", description: "Discutir o progresso do projeto UNI-31", category: "Reuniões", status: "todo" },
  { id: "2", title: "Relatório Mensal", description: "Preparar relatório de atividades do mês", category: "Administrativo", status: "progress" },
  { id: "3", title: "Disciplina de Informática", description:"Valor das questões: 80% para 20% no peso final e 1 questão de bônus no trabalho escolar página 45-46.", category: "Matemática", status: "done" },
];

export default function KanbanProfessorPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [zoomedCard, setZoomedCard] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", category: "" });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [professorName, setProfessorName] = useState<string>("Carregando...");
  const router = useRouter();

  // 🔹 Buscar professor no banco via API
  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const res = await fetch("/api/professor");
        const data = await res.json();
        setProfessorName(data?.nome || "Professor");
      } catch (err) {
        console.error("Erro ao buscar professor:", err);
        setProfessorName("Professor");
      }
    };
    fetchProfessor();
  }, []);

  // Carregar do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
    else setTasks(initialTasks);
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim() && newTask.category) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        category: newTask.category,
        status: "todo",
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "", category: "" });
      setIsAddTaskModalOpen(false);
    }
  };

  const handleEditTask = () => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
      setEditingTask(null);
      setIsEditTaskModalOpen(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      const columnTasks = tasks.filter((t) => t.status === source.droppableId);
      const [moved] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, moved);

      const otherTasks = tasks.filter((t) => t.status !== source.droppableId);
      setTasks([...otherTasks, ...columnTasks]);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggableId
            ? { ...task, status: destination.droppableId as Task["status"] }
            : task
        )
      );
    }
  };

  const filteredTasks = tasks.filter((task) => selectedCategory === "Todas" || task.category === selectedCategory);

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const progressTasks = filteredTasks.filter((t) => t.status === "progress");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  const renderColumn = (title: string, columnId: Task["status"], columnTasks: Task[]) => (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">{title}</h2>
        <Badge variant="secondary">{columnTasks.length}</Badge>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100/60 p-3 rounded-xl min-h-[300px]">
            {columnTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3 shadow-md hover:shadow-lg transition-all border border-gray-200 rounded-xl">
                    <CardHeader className="pb-2 flex flex-row justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-semibold">{task.title}</CardTitle>
                        <CardDescription className="text-xs text-gray-600 line-clamp-2">{task.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => { setEditingTask(task); setIsEditTaskModalOpen(true); }}>
                            <Edit className="h-4 w-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                      <Badge>{task.category}</Badge>
                      <Button variant="link" size="sm" className="text-blue-600 p-0" onClick={() => setZoomedCard(task.id)}>Detalhes</Button>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => setSidebarVisible(!sidebarVisible)}>☰</Button>
          <h1 className="text-xl font-semibold">{professorName}</h1>
        </div>
        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setIsAddTaskModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Nova Tarefa
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 min-h-screen p-6 transition-all duration-300 ${sidebarVisible ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
          <div className="mt-4 mb-6">
            <Button onClick={() => router.push("/chatbot")} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Bot className="h-4 w-4 mr-2" /> Tirar dúvidas com IA
            </Button>
          </div>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Filtros</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`block w-full text-left px-3 py-1 rounded ${selectedCategory === cat ? "bg-blue-100 text-blue-700" : "hover:bg-gray-50"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-6 border-t">
            <Button onClick={() => router.push("/settings")} variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" /> Configurações
            </Button>
            <Button onClick={() => router.push("/login")} variant="ghost" className="w-full justify-start text-red-600">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </aside>

        {/* Kanban */}
        <main className="flex-1 p-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-6">
              {renderColumn("Para Fazer", "todo", todoTasks)}
              {renderColumn("Em Andamento", "progress", progressTasks)}
              {renderColumn("Concluídos", "done", doneTasks)}
            </div>
          </DragDropContext>
        </main>
      </div>
    </div>
  );
}
