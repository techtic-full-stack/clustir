import VerifyOTP from "@/components/VerifyOTP";
import AuthLayout from "../components/auth/AuthLayout";


export default function Home() {
  return (
    <>
      <AuthLayout>
        <VerifyOTP />
      </AuthLayout>
    </>
  );
}
