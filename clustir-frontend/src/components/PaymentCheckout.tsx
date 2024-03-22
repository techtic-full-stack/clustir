
const PaymentCheckout = ({
  OnBoardData,
  setStep,
}: {
  OnBoardData: any;
  setStep: any;
}) => {


  return (
    <>
      <h2 className="text-black mb-6 !text-[24px] label">
      Payment
      </h2>
      <div className="text-black text-[12px] my-[10px]">
      Credit Card information provided will be used to pay for your  monthly Clustir Plan.
      </div>
    </>
  );
};

export default PaymentCheckout;
