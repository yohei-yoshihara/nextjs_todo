import type { Task, User } from "@prisma/client";
import type { TaskWithOptionalUser } from "@/app/lib/data";
import Link from "next/link";
import DeleteTaskButton from "./delete-task-button";

import { IoTicketOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

type Props = {
  task: TaskWithOptionalUser;
};

export default function TaskRow(props: Props) {
  const task = props.task;
  return (
    <div className="flex flex-row items-center">
      <Link href={`/dashboard/tasks/${task.id}/edit`}>
        <IoTicketOutline className="w-5 h-5 mr-4 text-gray-500" />
      </Link>
      <div className="w-72 mr-4">
        <p className="text-gray-500 font-bold truncate">{task.title}</p>
      </div>
      <div className="w-24 mr-4">
        <p className="text-gray-500">{task.due_date}</p>
      </div>
      {task.user ? (
        <div className="w-16 mr-4">
          <p className="text-gray-500 truncate">{task.user.username}</p>
        </div>
      ) : (
        <div className="w-16 mr-4" />
      )}
      {task.completed ? (
        <CiCircleCheck className="w-5 h-5 text-green-500 mr-4" />
      ) : (
        <div className="w-5 mr-4" />
      )}
      <Link href={`/dashboard/tasks/${task.id}/edit`}>
        <CiEdit className="w-5 h-5 text-blue-400 mr-4" />
      </Link>
      <DeleteTaskButton id={task.id} />
    </div>
  );
}
