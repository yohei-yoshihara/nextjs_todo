"use client";

import { ReactNode, useState, useTransition } from "react";
import AlertDialog from "@/app/ui/alert-dialog";
import { deleteTask } from "@/app/lib/actions/task";
import { MdDelete } from "react-icons/md";
import { useToast } from "@/app/ui/toast";

const yesButton: ReactNode = (
  <div className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md mr-4">
    Yes
  </div>
);
const noButton: ReactNode = (
  <div className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md">
    No
  </div>
);

type Props = {
  taskId: number;
};

const toastSuccess = (
  <div className="p-2 border-2 border-green-500 rounded-md bg-zinc-600">
    <span className="text-sm text-gray-300">Task has been deleted</span>
  </div>
);
const toastFailed = (
  <div className="p-2 border-2 border-red-500 rounded-md bg-zinc-600">
    <span className="text-sm text-gray-300">Failed to delete a task.</span>
  </div>
);

export default function DeleteTaskButton({ taskId }: Props) {
  function onYesButton() {
    startTransition(async () => {
      const error = await deleteTask(taskId);
      if (error.message) {
        console.error(`failed to delete task ${taskId}`);
        toast.open({ component: toastFailed });
        return;
      }
      console.log(`task ${taskId} has been deleted`);
      toast.open({ component: toastSuccess });
    });

    setIsOpen(false);
  }
  function onNoButton() {
    setIsOpen(false);
  }

  const toast = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <button onClick={() => setIsOpen(true)} disabled={isPending}>
        <MdDelete className="text-red-400" />
      </button>
      <AlertDialog
        isOpen={isOpen}
        buttons={[yesButton]}
        onCloseWithButton={onYesButton}
        closeButton={noButton}
        onClose={onNoButton}
        className="p-3 bg-zinc-600 rounded-xl shadow-xl">
        <h1 className="text-lg font-bold text-gray-400">Delete Task</h1>
        <div className="mb-3 text-gray-300">
          Are you sure to delete this task?
        </div>
      </AlertDialog>
    </div>
  );
}
