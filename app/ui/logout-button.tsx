import { logout } from "@/app/lib/actions/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        console.log("signout");
        const result = await logout();
      }}>
      <button className="bg-blue-500 text-white font-bold px-3 py-2 m-2 rounded-xl">
        Logout
      </button>
    </form>
  );
}
