import EditTaskForm from "@/app/ui/task/edit-task-form";
import { Metadata } from "next";
import Title from "@/app/ui/title";
import { getUsers, getTaskById } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Edit Task",
};

export default async function EditTaskPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const taskId = parseInt(id);

  const [task, users] = await Promise.all([getTaskById(taskId), getUsers()]);

  if (!task) {
    return <div>タスクが存在しません</div>;
  }

  return (
    <div className="m-5 md:m-10">
      <Title label="タスクの編集" />
      <EditTaskForm task={task} users={users} />
    </div>
  );
}
