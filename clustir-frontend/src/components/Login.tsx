import axiosInstance from "@/interceptors/Axios";
import { apiName } from "@/interceptors/apiName";
import { Button, Input, Typography } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useNotification } from "./Notification";
import Loader from "./Loader/Loader";
import { loginSchema } from "@/utils/formik/schema";

const { Text } = Typography;

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const notificationContext = useNotification();
  const handleNotifications: any = notificationContext?.handleNotifications;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let checkOnBoard = JSON.parse(
        localStorage.getItem("userData") ?? ""
      )?.is_onBoard;
      if (checkOnBoard === false) {
        router.push("/onboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const loginSubmit = async (values: any) => {
    try {
      setLoader(true);
      const login: any = await axiosInstance.post(
        apiName.login,
        JSON.stringify({ ...values })
      );
      if (login?.status_code !== 200) {
        // setError(login?.message);
        handleNotifications("error", `${login?.message}`, ``, 3);
        setLoader(false);
        return false;
      } else {
        setSubmitting(true);
        setTimeout(() => {
          if (login?.response?.is_onBoard === false) {
            router.push("/onboard");
          } else {
            router.push("/dashboard");
          }
          localStorage.setItem("token", login.token);
          localStorage.setItem("userData", JSON.stringify(login.response));
          handleNotifications("success", `Login successful`, ``, 3);
        }, 1000);
      }
    } catch (error: any) {
      // setError(error?.message);
      setLoader(false);
      setSubmitting(false);
    } finally {
      setLoader(false);
    }
    
  };

  return (
    <div className="flex justify-center items-center p-[30px]">
      {submitting ? (
        <>
          <div className="bg-[#FFFFFF] h-[64vh]">
            <Text className="font-bold   top-40 text-[20px]">
              Success! Hold tight
              <Loader />
            </Text>
          </div>
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={loginSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div className="w-[400px]">
                <div className="flex justify-center items-center font-[700] text-[25px]  text-[#000000]">
                  Business Login
                </div>
                <div className="mt-[30px] ">
                  <div className="mb-[20px]">
                    <div className="font-[700] text-[16px] font-brother text-[#000000] mb-[7px]">
                      Email
                    </div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="yourname@company.com"
                      as={Input}
                      className={`h-12 px-2 py-2 rounded-md border w-full ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-blue-500 input`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-[40px]">
                    <div className="font-[700] text-[16px] font-brother text-[#000000] mb-[7px]">
                      Password
                    </div>
                    <Field
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      as={Input.Password}
                      className={`px-2 !py-0 rounded-md border w-full ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-blue-500`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  {/* {error && (
                    <p className="text-red-500 my-[20px] font-500">{error}</p>
                  )} */}
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="w-full h-12 !bg-[#4C45EE] hover:bg-[#4C45EE]  font-[700]  letter-spacing-normal text-[15px] text-white py-2 px-4 rounded-md"
                    loading={loader}
                  >
                    Login
                  </Button>

                  <div className="mt-[25px] w-[400px] ">
                    <span className=" text-[#4C45EE] text-[16px] font-[500] flex justify-center items-center">
                      Forgot Password ?
                    </span>

                    <div className="text-[#000000] text-[14px] flex justify-center items-center  mt-[20px]">
                      Don’t have an account?
                      <span
                        className="text-[#000000] cursor-pointer ml-[5px] font-[600] text-[14px]"
                        onClick={() => router.push("/signup")}
                      >
                        Create One
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Login;
