import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        console.log("signout");
        const result = await signOut({
          redirect: true,
          redirectTo: "/dashboard",
        });
      }}>
      <button className="bg-blue-500 text-white font-bold px-3 py-2 m-2 rounded-xl">
        Logout
      </button>
    </form>
  );
}
