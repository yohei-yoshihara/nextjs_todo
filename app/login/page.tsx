import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <div className="m-5">
      <LoginForm />
      <div className="ml-5 mt-10">
        <h1 className="text-gray-500 font-bold mb-3">テストアカウント</h1>
        <ul>
          <li className="flex flex-row ">
            <div className="text-gray-500 w-16">user1</div>
            <div className="text-gray-500 w-32">password</div>
          </li>
          <li className="flex flex-row ">
            <div className="text-gray-500 w-16">user2</div>
            <div className="text-gray-500 w-32">password</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
