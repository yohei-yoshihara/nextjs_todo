import { deleteTask } from "@/app/lib/actions/task";
import { CiTrash } from "react-icons/ci";

type Props = {
  id: number;
};

export default function DeleteTaskButton(props: Props) {
  const deleteTaskWithId = deleteTask.bind(null, props.id);
  return (
    <form action={deleteTaskWithId}>
      <button type="submit" className="">
        <CiTrash className="w-5 h-5 text-red-400 hover:text-red-500" />
      </button>
    </form>
  );
}
