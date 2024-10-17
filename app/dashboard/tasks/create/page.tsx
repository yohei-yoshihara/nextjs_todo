import { getUsers } from "@/app/lib/data";
import CreateTaskForm from "@/app/ui/task/create-task-form";
import Title from "@/app/ui/title";

export default async function CreateTaskPage() {
  const users = await getUsers();
  return (
    <div className="m-5 md:m-10">
      <Title label="タスクの作成" />
      <CreateTaskForm users={users} />
    </div>
  );
}
