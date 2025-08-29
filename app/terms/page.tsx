"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function TermsPage() {
  const router = useRouter();
  const { user } = useAuth(); // pega o usuário logado
  const [accepted, setAccepted] = useState(false);

  const handleNext = () => {
    if (!accepted) return;

    if (!user) {
      // fallback caso não tenha usuário logado
      router.push("/login");
      return;
    }

    // redireciona conforme level
    if (user.level === "professor") {
      router.push("/uni31");
    } else if (user.level === "medio" || user.level === "fundamental") {
      router.push("/dashboard");
    } else {
      router.push("/dashboard"); // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Termo de Segurança e Privacidade de Dados
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Proteção e Transparência</CardTitle>
            <CardDescription>
              Por favor, leia com atenção antes de continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-sm text-gray-700 space-y-4 max-h-[300px] overflow-y-auto pr-2">
              <p>
                Nós levamos a segurança dos seus dados a sério. Assim como o
                Google e outras empresas responsáveis, aplicamos padrões
                avançados de criptografia, monitoramento contínuo e práticas de
                conformidade com a LGPD (Lei Geral de Proteção de Dados).
              </p>
              <p>
                Os seus dados pessoais serão utilizados apenas para fins
                relacionados ao funcionamento do aplicativo e não serão
                compartilhados com terceiros sem o seu consentimento expresso.
              </p>
              <p>
                Você pode solicitar a exclusão ou portabilidade dos seus dados a
                qualquer momento entrando em contato com nosso suporte.
              </p>
              <p>
                Ao aceitar este termo, você confirma que leu e compreendeu como
                os seus dados serão tratados e concorda com a nossa política de
                privacidade.
              </p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="accept"
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(!!checked)}
              />
              <Label htmlFor="accept" className="text-sm text-gray-700">
                Eu li e aceito o Termo de Segurança e Privacidade de Dados
              </Label>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!accepted}
              onClick={handleNext}
            >
              Próximo
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
