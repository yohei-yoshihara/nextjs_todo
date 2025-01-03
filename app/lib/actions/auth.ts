"use server";

import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { getUserByUsername, createUser } from "@/app/lib/data";
import { LoginFormSchema, LoginState, SignupFormSchema } from "../definitions";

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  console.log(
    `login, username = ${formData.get("username")}, password=${formData.get(
      "password"
    )} `
  );
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log("failed to login, fields are invalid");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userData = validatedFields.data;

  const user = await getUserByUsername(userData.username);
  console.log("user = ", user);

  if (!user) {
    console.log("failed to login, no user");
    return { message: "login error" };
  }

  if (!bcrypt.compare(userData.password, user.password)) {
    console.log("failed to login, incorrect password");
    return { message: "login error" };
  }

  console.log("createSession");
  await createSession(user.id, user.role);

  console.log("login success");
  redirect("/dashboard");
}

export async function signup(state: LoginState, formData: FormData) {
  // Validate form fields
  const data = {
    name: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    team: formData.get("team"),
    role: formData.get("role"),
  };
  console.log("signup start, data = ", data);

  const validatedFields = SignupFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error(
      "failed to signup, validation failed, ",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { username, password, role } = validatedFields.data;
  // 3. Insert the user into the database or call an Auth Library's API
  const user = await createUser(username, password, role);

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // TODO:
  // 4. Create user session
  await createSession(user.id, role);

  console.log("signup finished");
  // 5. Redirect user
  redirect("/profile");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
