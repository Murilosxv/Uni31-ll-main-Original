import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/mongo";
import Screen from "@/models/Screen";

// Defina aqui as roles padrão para cada tela
const defaultRoles: Record<string, string[]> = {
  dashboard: ["professor", "aluno"],
  settings: ["professor", "aluno", "suporte"],
  chatbot: ["aluno", "professor","suporte"],
  uni31: ["suporte","professor"], // sua tela de suporte
};

async function addScreens() {
  await connectDB();

  const appPath = path.join(process.cwd(), "app");
  const dirs = fs
    .readdirSync(appPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const dir of dirs) {
    // Pular diretórios especiais que não são telas
    if (["_next", "api", "components", "contexts", "lib", "models", "node_modules", "public", "styles"].includes(dir)) {
      continue;
    }

    const code = dir.toUpperCase();
    const title = dir.charAt(0).toUpperCase() + dir.slice(1);

    const rolesAllowed = defaultRoles[dir] || ["aluno", "professor"]; // fallback padrão

    const existing = await Screen.findOne({ code });
    if (existing) {
      console.log(`Tela ${code} já existe.`);
      continue;
    }

    const newScreen = await Screen.create({ code, title, rolesAllowed });
    console.log("Tela criada:", newScreen);
  }

  process.exit();
}

addScreens().catch((err) => {
  console.error(err);
  process.exit(1);
});
