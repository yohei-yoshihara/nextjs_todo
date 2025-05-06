"use server";

import db from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { generateHashedPassword } from "@/app/lib/utils";
import { Prisma, User, Task } from "@/app/generated/prisma";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TaskWithUser = Prisma.TaskGetPayload<{
  include: { user: true }
}>;

export type TaskWithOptionalUser = Optional<TaskWithUser, "user">;

export type UserWithTask = Prisma.UserGetPayload<{
  include: { tasks: true }
}>;

export type UserWithOptionalTask = Optional<UserWithTask, "tasks">;

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      username: username
    }
  });
  return user;
}

export async function getUserById(userId: number) : Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    }
  });
  return user;
}

export async function createUser(
  username: string,
  password: string,
  role: string
): Promise<User> {
  const user = await db.user.create({
    data: {
      username: username,
      password: await generateHashedPassword(password),
      role: role
    }
  });
  return user;
}

export async function getUsers(): Promise<UserWithTask[]> {
  const users = await db.user.findMany({
    include: {
      tasks: true
    }
  });
  return users;
}

export async function getTaskById(taskId: number): Promise<Task | null> {
  const task = await db.task.findUnique({
    where: {
      id: taskId
    }
  });
  return task;
}

export async function getTasksForUser(username: string): Promise<Task[]> {
  const user = await getUserByUsername(username);
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