import Styles from "./index.module.css";
import ClearIcon from "@mui/icons-material/Clear";
interface ModalProps {
  closeModal: any;
  content: any;
}
const Modal = ({ closeModal, content }: ModalProps) => {
  console.log(content);
  return (
    <div className={Styles.modal}>
      <div className={Styles.modal_container}>
        <button onClick={closeModal} className={Styles.closemodal_btn}>
          <ClearIcon style={{ width: "2rem", height: "2rem" }} />
        </button>
        {content}
      </div>
    </div>
  );
};
export default Modal;
