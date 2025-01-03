"use server";

// Server actions for User

import db from "@/app/lib/db";
import { z } from "zod";
import { generateHashedPassword } from "@/app/lib/utils";

export type UserState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

const UserScheme = z.object({
  username: z.string().min(1, { message: "ユーザー名は必須です" }),
  password: z.string().min(1, { message: "パスワード名は必須です" }),
});

export async function createUser(
  prevState: UserState,
  formData: FormData
): Promise<UserState> {
  const validatedFields = UserScheme.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力項目に誤りがあります",
    };
  }

  const { username, password } = validatedFields.data;

  try {
    const user = await db.user.create({
      data: {
        username,
        password: await generateHashedPassword(password),
        role: "user",
      },
    });
    return {};
  } catch (e) {
    console.log(e);
    return { message: "ユーザーの作成に失敗しました" };
  }
}
