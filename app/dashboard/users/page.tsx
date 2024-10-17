import { getUsers } from "@/app/lib/data";
import Title from "@/app/ui/title";
import TaskRows from "@/app/ui/task/task-rows";
import CreateTaskButton from "@/app/ui/task/create-task-button";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div className="m-5 md:m-10">
      <Title label="ユーザー別のタスクの一覧" />
      <div>
        <ul>
          {users.map((user) => {
            return (
              <li>
                <h2 className="text-gray-500 font-bold text-xl">
                  {user.username}
                </h2>
                <TaskRows tasks={user.tasks} />
              </li>
            );
          })}
        </ul>
      </div>
      <CreateTaskButton />
    </div>
  );
}
