"use client";

import { useActionState } from "react";
import { login } from "@/app/lib/actions/auth";
import { LoginState } from "../lib/definitions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form className="w-full max-w-sm" action={formAction}>
      {/* Username */}
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="username">
            Username
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
            id="username"
            name="username"
            type="text"
            defaultValue="user1"
          />
        </div>
      </div>
      <div className="md:flex md:flex-row md:items-center mb-6">
        <div className="w-1/3" />
        <div className="w-2/3">
          <ul className="space-y-2">
            {state.errors?.username &&
              state.errors.username.map((error: string) => (
                <li className="text-sm text-red-500" key={error}>
                  {error}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Password */}
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
            id="password"
            name="password"
            type="password"
            defaultValue="password"
          />
        </div>
      </div>
      <div className="md:flex md:flex-row md:items-center mb-6">
        <div className="w-1/3" />
        <div className="w-2/3">
          <ul className="space-y-2">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <li className="text-sm text-red-500" key={error}>
                  {error}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Login Button */}
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
