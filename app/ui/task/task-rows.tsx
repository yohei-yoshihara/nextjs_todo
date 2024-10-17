import { Prisma, Task } from "@prisma/client";
import TaskRow from "@/app/ui/task/task-row";
import type { TaskWithOptionalUser } from "@/app/lib/data";

type Props = {
  tasks: TaskWithOptionalUser[];
};

export default function TaskRows(props: Props) {
  const tasks: Task[] = props.tasks;

  return (
    <ul className="divide-y divide-gray-300 border-b border-t border-gray-300 mb-4">
      {tasks.map((task) => {
        return (
          <li key={task.id} className="p-2">
            <TaskRow task={{ user: null, ...task }} />
          </li>
        );
      })}
    </ul>
  );
}
