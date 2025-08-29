"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import LangflowChat from "@/components/LangflowChat";

export default function ChatbotPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Assistente de Estudos
            </h1>
          </div>
        </div>
      </header>

      {/* Chat cheio na página */}
      <div className="flex-1 h-[calc(100vh-80px)]">
        <LangflowChat />
      </div>
    </div>
  );
}
