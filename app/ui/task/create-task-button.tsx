import Link from "next/link";

export default function CreateTaskButton() {
  return (
    <Link href="/dashboard/tasks/create">
      <button className="bg-blue-500 text-white font-bold px-3 py-2 m-2 rounded-xl">
        新しいタスクの作成
      </button>
    </Link>
  );
}
