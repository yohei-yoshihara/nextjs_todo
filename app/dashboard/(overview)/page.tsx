import LogoutButton from "@/app/ui/logout-button";
import { getTasksForUser } from "@/app/lib/data";
import { auth } from "@/auth";
import { CubeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import TaskRow from "@/app/ui/task/task-row";
import Title from "@/app/ui/title";
import CreateTaskButton from "@/app/ui/task/create-task-button";

export default async function DashboardPage() {
  const session = await auth();
  console.log("session = ", session);

  const user = session?.user;

  if (!user || !user.name) {
    return <div>not logged in</div>;
  }

  const tasks = await getTasksForUser(user.name);

  return (
    <div className="m-5 md:m-10">
      <Title label={`${user.name}のタスク`} />
      <ul className="divide-y divide-gray-300 border-b border-t border-gray-300 mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-2">
            <TaskRow task={task} />
          </li>
        ))}
      </ul>
      <CreateTaskButton />
    </div>
  );
}
