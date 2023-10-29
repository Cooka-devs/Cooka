import AniButton from "../AniButton";
import Styles from "./index.module.css";
import ClearIcon from "@mui/icons-material/Clear";

interface ModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  content: React.ReactNode;
}

const Modal = ({ closeModal, content }: ModalProps) => {
  return (
    <div className={Styles.modal}>
      <div className={Styles.modal_container}>
        <AniButton onClick={closeModal} className={Styles.closemodal_btn}>
          <ClearIcon style={{ width: "2rem", height: "2rem" }} />
        </AniButton>
        {content}
      </div>
    </div>
  );
};
export default Modal;
