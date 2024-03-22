import axiosInstance from "@/interceptors/Axios";
import { apiName } from "@/interceptors/apiName";
import { useEffect, useState } from "react";
import BankingForm from "./BankingForm";
import BusinessContactInfo from "./BusinessContactInfo";
import PaymentCheckout from "./PaymentCheckout";
import { useRouter } from "next/router";

const OnboardProcess = () => {
  const [step, setStep] = useState(1);
  const [OnBoardData, setOnBoardData] = useState({});
  const router = useRouter();
  const getBusinessData = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userData") as string);
      const getData: any = await axiosInstance.get(
        `${apiName.getBusiness}${userData._id}`,
      );
      setOnBoardData({...getData.data.merchantBusiness,...getData.data.marchantBanking})
    } catch (error) {
    }
  }
  useEffect(()=>{
    getBusinessData()
  },[step])
  const handleStep = async (data:any) => {
    try {
      const register: any = await axiosInstance.post(
        `${apiName.addBusiness}?step=${step}`,
        JSON.stringify({ ...data })
      );
      setStep(step + 1);
    } catch (error) {
      
    }
  };
  const prevStep=()=>{
    if(step>1){
      setStep(step-1)
    } 
  }
  return (
    <>
      {step === 1 && (
        <BusinessContactInfo  OnBoardData={OnBoardData}  setStep={(data: any)=>handleStep(data)} prevStep={prevStep} />
      )}
      {step === 2 && (
        <BankingForm  OnBoardData={OnBoardData} setStep={(data: any)=>handleStep(data)}  prevStep={prevStep}/>
      )}
      {step === 3 && (<PaymentCheckout OnBoardData={OnBoardData} setStep={(data: any)=>handleStep(data)}   />)}
    </>
  );
};
export default OnboardProcess;
