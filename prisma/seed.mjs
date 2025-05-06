import { PrismaClient } from "../app/generated/prisma/index.js";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

async function generateHash(password) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

const db = new PrismaClient();

async function main() {
  console.log("start seeding")
  await db.task.deleteMany();
  await db.user.deleteMany();

  let tasks = [];
  for (let i = 0; i < 10; i++) {
    tasks.push({
      title: `Task ${i}`,
      description: `This is Task ${i}`,
      due_date: dayjs().add(i, "day").format("YYYY/MM/DD"),
      completed: Math.floor(Math.random() * 3) == 0,
    });
  }
  await db.user.create({
    data: {
      username: "user1",
      password: await generateHash("password"),
      role: "user",
      tasks: {
        create: tasks,
      },
    },
  });

  tasks = [];
  for (let i = 11; i < 15; i++) {
    tasks.push({
      title: `Task ${i}`,
      description: `This is Task ${i}`,
      due_date: dayjs().add(i, "day").format("YYYY/MM/DD"),
      completed: Math.floor(Math.random() * 3) == 0,
    });
  }
  await db.user.create({
    data: {
      username: "user2",
      password: await generateHash("password"),
      role: "admin",
      tasks: {
        create: tasks,
      },
    },
  });
  console.log("done");
}

main();