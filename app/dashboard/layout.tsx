import Link from "next/link";
import type { Metadata } from "next";
import "@/app/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  HomeIcon,
  TicketIcon,
  UsersIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const menuList = [
  {
    title: "ダッシュボード",
    path: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "すべてのタスク",
    path: "/dashboard/tasks",
    icon: TicketIcon,
  },
  {
    title: "ユーザ別タスク",
    path: "/dashboard/users",
    icon: UsersIcon,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col md:flex-row">
          {/* Side Menu */}
          <div className="md:w-1/5 border-b md:border-r border-gray-300 md:h-screen p-3 mb-3">
            <div className="flex flex-row md:flex-col md:mt-5">
              {menuList.map((menu) => {
                const LinkIcon = menu.icon;
                return (
                  <Link
                    href={menu.path}
                    key={menu.path}
                    className="flex flex-row items-center md:ml-5 md:mb-5">
                    <LinkIcon className="w-5 h-5 text-gray-500 mr-4" />
                    <div className="text-gray-500 font-bold w-30 mr-5">
                      {menu.title}
                    </div>
                  </Link>
                );
              })}

              {/* サインアウト */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}>
                <button className="flex flex-row items-center md:ml-5">
                  <PowerIcon className="w-5 h-5 text-gray-500 mr-4" />
                  <div className="text-gray-500 font-bold">ログアウト</div>
                </button>
              </form>
            </div>
          </div>
          {/* Main Screen */}
          <div className="md:w-4/5">{children}</div>
        </div>
      </body>
    </html>
  );
}