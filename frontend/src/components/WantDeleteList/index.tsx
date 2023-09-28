import DefaultAxiosService from "@/service/DefaultAxiosService";
import Styles from "./index.module.css";
import { onClickDeleteList } from "@/api/deleteList";
import { useRouter } from "next/router";
interface WantDeleteModalProp {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  type: string;
}
export const WantDeleteList: React.FC<WantDeleteModalProp> = ({
  closeModal,
  id,
  type,
}) => {
  const router = useRouter();
  return (
    <div className={Styles.delete_modal_text}>
      <h1 style={{ fontSize: "2.5rem" }}>정말로 삭제하시겠습니까?</h1>
      <div style={{ paddingTop: "3rem", fontSize: "2rem" }}>
        글 삭제 동의하십니까?
      </div>
      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button
          onClick={async () => {
            await onClickDeleteList(id, type);
            router.push(`/${type}`);
          }}
        >
          예
        </button>
        <button
          onClick={() => {
            closeModal(false);
          }}
        >
          아니오
        </button>
      </div>
    </div>
  );
};
