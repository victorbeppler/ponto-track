import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (e) {
    console.error("Erro ao conectar com o banco de dados:", e);
  }
}

main().catch((e) => {
  console.error("Erro no main:", e);
  process.exit(1);
});

export default prisma;
