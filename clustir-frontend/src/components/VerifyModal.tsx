import { FC } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface VerifySuccessModalProps {
  visible: boolean;
  onClose: () => void;
  redirect: string;
}

const VerifySuccessModal: FC<VerifySuccessModalProps> = ({
  visible,
  onClose,
  redirect,
}) => {
  const router = useRouter();
  return (
    <Modal
      title={
        <div
          style={{
            backgroundColor: "rgb(228, 228, 228)",
            padding: "12px 0px 12px 32px",
            margin: "-20px",
            borderRadius: "8px 8px 0px 0px",
            marginLeft: "-24px",
            marginRight: "-24px",
            marginBottom: "20px",
          }}
        >
          <span className="text-[#000000] font-[700] text-[18px]">
            Account verified!
          </span>
          <Button
            type="text"
            style={{ position: "absolute", right: "16px" }}
            onClick={onClose}
            icon={<CloseOutlined />}
          />
        </div>
      }
      open={visible}
      centered
      footer={null}
      onCancel={onClose}
      closable={false}
      width={500}
    >
      <p
        style={{
          color: "#000000",
          padding: "0px 0px 24px 9px",
        }}
      >
        Thank you for verifying your account, you’re all set..
      </p>
      <div style={{ textAlign: "right" }}>
        <Button
          type="primary"
          style={{
            backgroundColor: "#4C45EE",
            color: "#FFF",
            fontWeight: "700",
            letterSpacing: "1px",
            padding: "7px 40px 30px",
          }}
          onClick={() => {
            router.push(redirect);
            onClose();
          }}
        >
          Next
        </Button>
      </div>
    </Modal>
  );
};

export default VerifySuccessModal;
