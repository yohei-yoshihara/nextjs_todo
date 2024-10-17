import { getTasks } from "@/app/lib/data";
import CreateTaskButton from "@/app/ui/task/create-task-button";
import TaskRow from "@/app/ui/task/task-row";
import Title from "@/app/ui/title";

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <div className="m-5 md:m-10">
      <Title label="すべてのタスク" />
      <div>
        <ul className="divide-y divide-gray-300 border-t border-b border-gray-300 mb-4">
          {tasks.map((task) => {
            return (
              <li key={task.id} className="p-2">
                <TaskRow task={task} />
              </li>
            );
          })}
        </ul>
      </div>
      <CreateTaskButton />
    </div>
  );
}
