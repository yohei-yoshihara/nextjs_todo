"use server";

import db from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { generateHashedPassword } from "@/app/lib/utils";
import { Prisma, User, Task } from "@prisma/client";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TaskWithUser = Prisma.TaskGetPayload<{
  include: { user: true };
}>;

export type TaskWithOptionalUser = Optional<TaskWithUser, "user">;

export type UserWithTask = Prisma.UserGetPayload<{
  include: { tasks: true };
}>;

export type UserWithOptionalTask = Optional<UserWithTask, "tasks">;

export async function getUser(username: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

export async function createUser(
  username: string,
  password: string
): Promise<void> {
  await db.user.create({
    data: {
      username: username,
      password: await generateHashedPassword(password),
    },
  });
}

export async function getUsers(): Promise<UserWithTask[]> {
  const users = await db.user.findMany({
    include: {
      tasks: true,
    },
  });
  return users;
}

export async function getTaskById(taskId: number): Promise<Task | null> {
  const task = await db.task.findUnique({
    where: {
      id: taskId,
    },
  });
  return task;
}

export async function getTasksForUser(username: string): Promise<Task[]> {
  const user = await getUser(username);
  return await db.task.findMany({
    where: {
      userId: user?.id,
    },
  });
}

export async function getTasks(): Promise<TaskWithUser[]> {
  const tasks = await db.task.findMany({
    include: {
      user: true,
    },
  });
  return tasks;
}