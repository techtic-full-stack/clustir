import { Button, Card, Col, Input, Row } from "antd";
import {  Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { bankingSchema } from "@/utils/formik/schema";


const initialValues = {
  bankingAccount: "",
  routingNumber: "",
  einNumber: "",
};

const BankingForm = ({
  OnBoardData,
  setStep,
  prevStep,
}: {
  OnBoardData: any;
  setStep: any;
  prevStep: any;
}) => {
  const onSubmit = (values: any) => {
    try {
      setStep({ ...OnBoardData, ...values });
    } catch (error) {}
  };
  return (
    <>
      <h2 className="text-black !mb-[20px] !text-[25px] label">Banking</h2>
      <Formik
        initialValues={OnBoardData || initialValues}
        validationSchema={bankingSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors }) => {
          return (
            <Form>
              <Card className="flex flex-col bg-[#FFFFFF] p-[5px] rounded-lg w-[862px] px-[70px]">
                <div className="text-[18px] uppercase label">Banking Info</div>
                <div className="text-[12px] my-[10px] text-[#000000BF]">
                  The banking information provided is used for Clustir Payouts
                  to make monthly subscription revenue ACH deposits into your
                  business bank account.. Clustir Payouts are made on 15th and
                  30th of every month via ACH to your selected business bank
                  account. We will send you a notification once an ACH has been
                  confirmed
                </div>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Bank Name <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="bankingAccount"
                      name="bankingAccount"
                      as={Input}
                    />
                    <ErrorMessage
                      name="bankingAccount"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Routing  #<span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="routingNumber"
                      name="routingNumber"
                      as={Input}
                    />
                    <ErrorMessage
                      name="routingNumber"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      EIN # <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="einNumber"
                      name="einNumber"
                      as={Input}
                    />
                    <ErrorMessage
                      name="einNumber"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>
              </Card>
              <div className="flex justify-end py-[20px]">
                <Button
                  type="default"
                  onClick={prevStep}
                  className="text-[#4C45EE]  border-[#4C45EE] mr-[10px] w-[100px] h-[40px]"
                >
                  Go back
                </Button>
                <Button
                  loading={isSubmitting}
                  type="primary"
                  htmlType="submit"
                  className="bg-[#4C45EE] text-white w-[100px] h-[40px]"
                >
                  Next
                </Button>
              </div>{" "}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BankingForm;
