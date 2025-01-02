"use client";
import { useState, useActionState } from "react";
import dayjs from "dayjs";
import { createTask, TaskState } from "@/app/lib/actions/task";
import { getUsers, UserWithTask } from "@/app/lib/data";
import DatePicker from "@/app/ui/date-picker/date-picker";

import { AiOutlineExclamationCircle } from "react-icons/ai";

const dateFormat = "YYYY/MM/DD";

type Props = {
  users: UserWithTask[];
};

export default function CreateTaskForm(props: Props) {
  const initialState: TaskState = { message: null, errors: {} };
  const [errorMessage, formAction, isPending] = useActionState<
    TaskState,
    FormData
  >(createTask, initialState);

  const now = dayjs();

  const [dueDate, setStartDate] = useState<Date | null>(now.toDate());

  const users = props.users;

  return (
    <form
      className="w-full max-w-lg border border-gray-300 shadow rounded-xl m-3 p-3"
      action={formAction}>
      {/* title */}
      <div className="flex items-center mb-1">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right mr-3"
            htmlFor="title">
            タイトル
          </label>
        </div>
        <div className="w-2/3">
          <input
            className="block w-full appearance-none border-2 bg-gray-200 rounded focus:outline-none focus:border-gray-500 px-4 py-2"
            type="text"
            name="title"
            id="title"></input>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          {errorMessage.errors?.title &&
            errorMessage.errors.title.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* description */}
      <div className="flex items-start mb-1">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right mr-3 "
            htmlFor="description">
            説明
          </label>
        </div>
        <div className="w-2/3">
          <textarea
            rows={8}
            className="block w-full appearance-none border-2 bg-gray-200 rounded focus:outline-none focus:border-gray-500 px-4 py-2"
            name="description"
            id="description"></textarea>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          {errorMessage.errors?.description &&
            errorMessage.errors.description.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* due date */}
      <div className="flex items-center mb-1">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right mr-3"
            htmlFor="due_date">
            期限日
          </label>
        </div>
        <div className="w-2/3">
          <DatePicker
            onChange={(date) => {
              setStartDate(date);
            }}
            name="due_date"
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          {errorMessage.errors?.due_date &&
            errorMessage.errors.due_date.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* completed */}
      <div className="flex items-center mb-1">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right mr-3"
            htmlFor="completed">
            完了
          </label>
        </div>
        <div className="w-2/3">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            value="yes"></input>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          {errorMessage.errors?.completed &&
            errorMessage.errors.completed.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* user */}
      <div className="flex mb-4">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right mr-3"
            htmlFor="completed">
            担当者
          </label>
        </div>
        <div className="w-2/3">
          <select className="w-full text-gray-500" name="userId">
            <option value="0" className="">
              (なし)
            </option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          {errorMessage.errors?.userId &&
            errorMessage.errors.userId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          <button
            className=" text-white font-bold bg-blue-500 hover:bg-blue-400 rounded-xl p-2"
            type="submit">
            タスクの作成
          </button>
        </div>
      </div>

      {errorMessage?.message && (
        <div className="flex flex-row">
          <div className="w-1/3"></div>
          <div
            className="w-2/3 flex h-8 items-end space-x-1 mt-2"
            aria-live="polite"
            aria-atomic="true">
            <AiOutlineExclamationCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage.message}</p>
          </div>
        </div>
      )}
    </form>
  );
}
