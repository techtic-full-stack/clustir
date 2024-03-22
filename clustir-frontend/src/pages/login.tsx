import Login from "@/components/Login";
import AuthLayout from "../components/auth/AuthLayout";
export default function Home() {
  return (
    <>
      <AuthLayout>
        <Login />
      </AuthLayout>
    </>
  );
}
