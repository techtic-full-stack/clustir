import CreateAccount from "@/components/createAccount";
import AuthLayout from "../components/auth/AuthLayout";


export default function Home() {
  return (
    <>
      <AuthLayout>
        <CreateAccount />
      </AuthLayout>
    </>
  );
}
