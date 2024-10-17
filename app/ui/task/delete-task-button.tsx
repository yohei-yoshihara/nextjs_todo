import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteTask } from "@/app/lib/actions/task";

type Props = {
  id: number;
};

export default function DeleteTaskButton(props: Props) {
  const deleteTaskWithId = deleteTask.bind(null, props.id);
  return (
    <form action={deleteTaskWithId}>
      <button type="submit" className="">
        <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
      </button>
    </form>
  );
}
