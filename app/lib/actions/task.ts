"use server";

// タスクのためのサーバーアクション

import db from "@/app/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "../data";

export type TaskState = {
  errors?: {
    title?: string[];
    description?: string[];
    due_date?: string[];
    completed?: string[];
    userId?: string[];
  };
  message?: string | null;
};

// checkboxの検証
// https://github.com/edmundhung/conform/issues/107
const CreateTask = z.object({
  title: z
    .string({ message: "タイトルは必須です" })
    .min(1, { message: "タイトルは必須です" }),
  description: z
    .string({ message: "説明は必須です" })
    .min(1, { message: "説明は必須です" }),
  due_date: z.string({ message: "期限日は必須です" }),
  completed: z.preprocess((value) => value === "yes", z.boolean()),
  userId: z.number(),
});

export async function createTask(
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  console.log("formData = ", formData);
  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    due_date: formData.get("due_date"),
    completed: formData.get("completed"),
    userId: parseInt(formData.get("userId") as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力項目に誤りがあります",
    };
  }

  const { title, description, due_date, completed, userId } =
    validatedFields.data;

  try {
    const task = await db.task.create({
      data: {
        title,
        description,
        due_date,
        completed,
        userId: userId !== 0 ? userId : null,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: "タスクの作成に失敗しました" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
  return {};
}

const UpdateTask = z.object({
  title: z
    .string({ message: "タイトルは必須です" })
    .min(1, { message: "タイトルは必須です" }),
  description: z
    .string({ message: "説明は必須です" })
    .min(1, { message: "説明は必須です" }),
  due_date: z.string({ message: "期限日は必須です" }),
  completed: z.preprocess((value) => value === "yes", z.boolean()),
  userId: z.number(),
});

export async function updateTask(
  id: number,
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  console.log("formData = ", formData);

  const validatedFields = UpdateTask.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    due_date: formData.get("due_date"),
    completed: formData.get("completed"),
    userId: parseInt(formData.get("userId") as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力項目に誤りがあります",
    };
  }

  const { title, description, due_date, completed, userId } =
    validatedFields.data;

  try {
    const task = await db.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        due_date,
        completed,
        userId: userId !== 0 ? userId : null,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: "タスクの更新に失敗しました" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
  return {};
}

export async function deleteTask(id: number) {
  console.log("deleteTask id=", id);
  try {
    await db.task.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
  } catch (e) {
    console.error(e);
    return { message: "タスクの削除に失敗しました" };
  }
  return {};
}
