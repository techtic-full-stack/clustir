import { ClustirLogo } from "../assets/ClustirLogo";
import { ReactNode } from "react";

type LayoutWrapperType = {
  children?: ReactNode;
};

/**
 * Renders the layout for the authentication pages.
 */
const Layout = ({ children }: LayoutWrapperType) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F8F8]">
      <div className="flex flex-col justify-center items-center relative">
        <div className="mt-[30px] w-[600px] ">
          <div className="flex items-center justify-center">
            <ClustirLogo />
          </div>
          <div className="mt-[25px] bg-[#FFFFFF] rounded-md">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F4F4F4] py-4 text-sm h-[77px] flex items-center mt-[20px]">
        <div className="flex pl-[77px]">
          <div className="text-[#000] font-brother font-normal text-base leading-tight">
            ©2023 Clustir, Inc.
          </div>
          <button className="pl-[100px] text-base font-normal leading-tight text-[#4C45EE] focus:outline-none">
            Privacy Policy
          </button>

          <button className="pl-[40px] text-base font-normal leading-tight text-[#4C45EE] focus:outline-none">
            Terms of Service
          </button>

          <button className="pl-[40px] text-base font-normal leading-tight text-[#4C45EE] focus:outline-none">
            Cookie Policy
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
