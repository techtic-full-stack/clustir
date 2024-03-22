import { BusinessContactInfoSchema } from "@/utils/formik/schema";
import { Button, Card, Col, Input, Row } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";

interface FormValues {
  businessName: string | undefined;
  contactName: string;
  employerId: string;
  title: string;
  websiteUrl: string;
  businessStreetAddress: string;
  aptSteBldg?: string; // optional field
  zipCode: string;
  city: string;
  state: string;
  mobile: string;
}

const initialValues = {
  businessName: "",
  contactName: "",
  employerId: "",
  title: "",
  websiteUrl: "",
  businessStreetAddress: "",
  aptSteBldg: "",
  zipCode: "",
  city: "",
  state: "",
  mobile: "",
};

const BusinessContactInfo = ({
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
      <h2 className="text-black !mb-[20px]  !text-[24px] label">
        Business Contact Info
      </h2>
      <Formik
        initialValues={OnBoardData || initialValues}
        validationSchema={BusinessContactInfoSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors }) => {
          return (
            <Form>
              <Card className="flex flex-col bg-[#FFFFFF] p-[5px] rounded-lg w-[862px] px-[70px]">
                <div className="pb-[25px] label ">CONTACT INFORMATION </div>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Business Name <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="businessName"
                      name="businessName"
                      as={Input}
                    />
                    <ErrorMessage
                      name="businessName"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Contact Name <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="contactName"
                      name="contactName"
                      as={Input}
                    />
                    <ErrorMessage
                      name="contactName"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Employer ID # <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="employerId"
                      name="employerId"
                      as={Input}
                    />
                    <ErrorMessage
                      name="employerId"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>
                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Title <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="title"
                      name="title"
                      as={Input}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Website URL <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="websiteUrl"
                      name="websiteUrl"
                      as={Input}
                    />
                    <ErrorMessage
                      name="websiteUrl"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Business Street Address{" "}
                      <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="businessStreetAddress"
                      name="businessStreetAddress"
                      as={Input}
                    />
                    <ErrorMessage
                      name="businessStreetAddress"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">Apt. Ste. Bldg. (Optional)</div>
                    <Field
                      type="text"
                      size="large"
                      id="aptSteBldg"
                      name="aptSteBldg"
                      as={Input}
                    />
                    <ErrorMessage
                      name="aptSteBldg"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>
                <Row className="my-[14]  sm:mb-5">
                  <Col span={12} className="pr-[8px] sm:mb-0">
                    <div className="label">
                      Zip Code <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="zipCode"
                      name="zipCode"
                      as={Input}
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                  <Col span={12} className="pl-[8px] sm:mb-0">
                    <div className="label">
                      City <span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="city"
                      name="city"
                      as={Input}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      State<span className="text-[red]">*</span>
                    </div>
                    <Field
                      type="text"
                      size="large"
                      id="state"
                      name="state"
                      as={Input}
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>

                <Row className="my-[14] sm:mb-5">
                  <Col span={24} className="mb-5 sm:mb-0">
                    <div className="label">
                      Mobile<span className="text-[red]">*</span>
                    </div>
                    <div className="flex">
                      <Field
                        prefix={
                          <span className="text-[#8C8C8C] text-[12px]">
                            Mobile <br />
                            +1
                          </span>
                        }
                        className="ant-input"
                        type="text"
                        id="mobile"
                        name="mobile"
                        as={Input}
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500"
                    />
                  </Col>
                </Row>
              </Card>
              <div className="flex justify-end py-[20px]">
                <Button
                  onClick={prevStep}
                  type="default"
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

export default BusinessContactInfo;
