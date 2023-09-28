import { CsItem, PlaceProps, Recipe } from "@/types";
import Styles from "./index.module.css";
import CreateList from "../CreateList";
import { useRouter } from "next/router";
interface ListModifyProps {
  modifyType: string;
  post: Recipe | PlaceProps | CsItem;
}
export const ListModify = ({ modifyType, post }: ListModifyProps) => {
  const router = useRouter();
  return (
    <div className={Styles.modify_container}>
      <div className={Styles.modify_left}>
        <CreateList textType="modify" modifyType={modifyType} post={post} />
      </div>
      <div className={Styles.modify_right}>
        <div className={Styles.modify_right_make}>
          <button className={Styles.goback_btn} onClick={() => router.reload()}>
            <div style={{ fontSize: "2rem", fontWeight: "700" }}>돌아가기</div>
            <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
              수정을 취소하고
              <br />
              글목록으로 돌아갈께요.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
