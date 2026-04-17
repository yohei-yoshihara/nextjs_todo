import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

async function generateHash(password: string) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

async function main() {
  console.log("start seeding")
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();

  let tasks = [];
  for (let i = 0; i < 10; i++) {
    tasks.push({
      title: `Task ${i}`,
      description: `This is Task ${i}`,
      due_date: dayjs().add(i, "day").format("YYYY/MM/DD"),
      completed: Math.floor(Math.random() * 3) == 0,
    });
  }
  await prisma.user.create({
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
  await prisma.user.create({
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