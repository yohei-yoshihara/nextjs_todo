import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  HomeIcon,
  TicketIcon,
  UsersIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

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
      <body>{children}</body>
    </html>
  );
}