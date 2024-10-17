"use server";

// Server actions for User

import db from "@/app/lib/db";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
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
      },
    });
    return {};
  } catch (e) {
    console.log(e);
    return { message: "ユーザーの作成に失敗しました" };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "誤ったユーザ名とパスワードの組み合わせです";
        default:
          return "ユーザー認証に失敗しました";
      }
    }
    throw error;
  }
}
