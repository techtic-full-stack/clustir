import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { ClustirLogo } from "./assets/ClustirLogo";
const lock = require("./assets/lock.png");

type LayoutWrapperType = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutWrapperType) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#FFFFFF] flex justify-between px-[106px] py-[20px]">
        <div className="flex items-center">
          <ClustirLogo />
          <div className="pl-[60px] flex items-center">
            <Image src={lock} alt="Lock" width={15} height={15} />
            <h2 className="text-[#00000080]">Secure Checkout</h2>
          </div>
        </div>
        <div className="flex items-center pr-[60px]">
          <LogoutOutlined style={{ color: "#7F7F7F" }} title="Logout" onClick={handleLogout} />
        </div>
      </header>
      <main className="flex justify-center items-center flex-grow bg-[#F8F8F8]">
        {children}
      </main>
    </div>
  );
};

export default Layout;