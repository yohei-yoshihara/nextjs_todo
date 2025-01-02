import LogoutButton from "@/app/ui/logout-button";
import CreateTaskForm from "@/app/ui/task/create-task-form";
import Link from "next/link";
import { IoIosArrowDropright } from "react-icons/io";

export default function Home() {
  return (
    <div className="m-5 max-w-sm">
      <p className="text-gray-500 text-3xl font-bold mb-5">ようこそ</p>
      <Link href="/dashboard" className="">
        <div className="flex flex-row justify-center bg-blue-500 p-5 rounded-xl w-64 text-white">
          <span className="font-bold mr-2">ダッシュボードへ</span>
          <IoIosArrowDropright className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
}
