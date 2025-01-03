import LogoutButton from "@/app/ui/logout-button";
import { getTasksForUser } from "@/app/lib/data";
import TaskRow from "@/app/ui/task/task-row";
import Title from "@/app/ui/title";
import CreateTaskButton from "@/app/ui/task/create-task-button";
import { getUserFromSession } from "@/app/lib/session";

export default async function DashboardPage() {
  const user = await getUserFromSession();
  if (!user || !user.username) {
    return <div>not logged in</div>;
  }

  const tasks = await getTasksForUser(user.username);

  return (
    <div className="m-5 md:m-10">
      <Title label={`${user.username}のタスク`} />
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
