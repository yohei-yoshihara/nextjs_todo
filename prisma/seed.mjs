import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

async function generateHash(password) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

const db = new PrismaClient();

async function main() {
  await db.task.deleteMany();
  await db.user.deleteMany();

  await db.user.create({
    data: {
      username: "user1",
      password: await generateHash("password"),
      tasks: {
        create: [
          { title: 'Task1 - wnKBUgrijrRWdVEIlbMXlOXCTWDpFbQK', description: "This is Task1", due_date: "2024/12/20", completed: true },
          { title: 'Task2 - woLMlmsDQRUWvILPFemZfKpiYq', description: "This is Task2", due_date: "2024/12/21", completed: true },
          { title: 'Task3 - myhMXqzTjRJuLXOxaNLW', description: "This is Task3", due_date: "2024/12/22" },
          { title: 'Task4 - lgyladWstTrVOCj', description: "This is Task3", due_date: "2024/12/23" },
          { title: 'Task5 - ksDGlupVji', description: "This is Task3", due_date: "2024/12/24" },
        ],
      },
    },
  })

  await db.user.create({
    data: {
      username: "user2",
      password: await generateHash("password"),
      tasks: {
        create: [
          { title: 'Task6', description: "This is Task4", due_date: "2024/12/23", completed: true },
          { title: 'Task7', description: "This is Task5", due_date: "2024/12/24" },
          { title: 'Task8', description: "This is Task5", due_date: "2024/12/24" },
        ],
      },
    },
  })
}

main();